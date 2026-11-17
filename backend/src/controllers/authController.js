const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const fs = require('fs/promises');
const path = require('path');

// Public registration always creates a standard user. Admins are provisioned separately.
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, phone, address, gender } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('Email already exists', 400));
  }

  const userData = {
    name,
    email,
    password,
    phone,
    address,
    gender,
    role: 'user',
  };

  // Handle avatar upload if provided
  if (req.body.avatar) {
    userData.avatar = {
      public_id: 'user_avatar_' + Date.now(),
      url: req.body.avatar,
    };
  }

  const user = await User.create(userData);

  sendToken(user, 201, res);
});

// Seller registration stores the business profile and creates a restricted seller account.
exports.registerSeller = catchAsyncErrors(async (req, res, next) => {
  const { ownerName, shopName, email, password, phone, businessAddress,
    nicOrBusinessRegNo, bankAccountOrPaymentMethod, agreedToSellerPolicy, avatar } = req.body;
  if (!ownerName || !shopName || !email || !password || !phone || !businessAddress) {
    return next(new ErrorHandler('Complete the required seller information', 400));
  }
  if (!agreedToSellerPolicy) return next(new ErrorHandler('You must accept the seller policy', 400));
  if (await User.findOne({ email: email.toLowerCase() })) return next(new ErrorHandler('Email already exists', 400));
  const user = await User.create({
    name: ownerName, shopName, email: email.toLowerCase(), password, phone,
    businessAddress, address: businessAddress, nicOrBusinessRegNo,
    bankAccountOrPaymentMethod, role: 'seller', isVerified: false,
    avatar: avatar ? { public_id: `seller_avatar_${Date.now()}`, url: avatar } : undefined,
  });
  res.status(201).json({ success: true, message: 'Seller account created successfully', user: { id: user.id, email: user.email } });
});

// Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is entered
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  // Find user in database
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }
  if (user.accountStatus === 'deactivated') {
    return next(new ErrorHandler('This account is deactivated. Contact support to restore access.', 403));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

// Get user profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const allowed = ['name', 'phone', 'address'];
  if (req.user.role === 'seller') allowed.push('shopName', 'businessAddress', 'nicOrBusinessRegNo', 'bankAccountOrPaymentMethod', 'shopDescription', 'notifications');
  const newUserData = {};
  allowed.forEach(key => { if (req.body[key] !== undefined) newUserData[key] = req.body[key]; });

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) return next(new ErrorHandler('Choose a profile image to upload', 400));
  const currentUser = await User.findById(req.user.id);
  const oldAvatar = currentUser?.avatar;
  const avatar = { public_id: req.file.filename, url: `/uploads/avatars/${req.file.filename}` };
  const user = await User.findByIdAndUpdate(req.user.id, { avatar }, { new: true, runValidators: true });

  if (oldAvatar?.url?.startsWith('/uploads/avatars/') && oldAvatar.public_id) {
    try { await fs.unlink(path.join(__dirname, '../../uploads/avatars', path.basename(oldAvatar.public_id))); }
    catch (error) { if (error.code !== 'ENOENT') console.error('Could not remove old avatar:', error.message); }
  }
  res.status(200).json({ success: true, user });
});

exports.deactivateAccount = catchAsyncErrors(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { accountStatus: 'deactivated' });
  res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: 'Account deactivated' });
});

// Update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!req.body.oldPassword || !req.body.password) {
    return next(new ErrorHandler('Current password and new password are required', 400));
  }

  if (req.body.password.length < 6) {
    return next(new ErrorHandler('New password must be at least 6 characters', 400));
  }

  // Check previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// Admin: Create another admin account. This endpoint is never public.
exports.createAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler('Name, email, and password are required', 400));
  }

  if (password.length < 6) {
    return next(new ErrorHandler('Password must be at least 6 characters', 400));
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return next(new ErrorHandler('An account with this email already exists', 400));
  }

  const admin = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role: 'admin',
    isVerified: true,
  });

  res.status(201).json({
    success: true,
    message: 'Admin account created successfully',
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
});

// Admin: Get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Admin: Get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Update user
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const existing = await User.findById(req.params.id);
  if (!existing) return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
  if (existing.role === 'admin') return next(new ErrorHandler('Administrator roles are managed through the dedicated admin workflow', 403));
  if (!['user', 'seller'].includes(req.body.role)) return next(new ErrorHandler('Role must be customer or seller', 400));
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
  }
  if (user.role === 'admin' || String(user._id) === String(req.user.id)) {
    return next(new ErrorHandler('Administrator accounts cannot be deleted from user management', 403));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
