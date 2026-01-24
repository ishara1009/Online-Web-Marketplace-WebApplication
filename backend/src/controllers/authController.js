const User = require('../models/User');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// Register a customer
exports.registerCustomer = catchAsyncErrors(async (req, res, next) => {
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
    role: 'customer',
  };

  // Handle avatar upload if provided
  if (req.body.avatar) {
    userData.avatar = {
      public_id: 'customer_avatar_' + Date.now(),
      url: req.body.avatar,
    };
  }

  const user = await User.create(userData);

  sendToken(user, 201, res);
});

// Register a seller
exports.registerSeller = catchAsyncErrors(async (req, res, next) => {
  const {
    ownerName,
    shopName,
    email,
    password,
    phone,
    businessAddress,
    nicOrBusinessRegNo,
    bankAccountOrPaymentMethod,
    agreedToSellerPolicy,
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler('Email already exists', 400));
  }

  // Validate seller policy agreement
  if (!agreedToSellerPolicy) {
    return next(new ErrorHandler('You must agree to the seller policy', 400));
  }

  const userData = {
    name: shopName, // Use shop name as the main name
    email,
    password,
    phone,
    ownerName,
    shopName,
    businessAddress,
    nicOrBusinessRegNo,
    bankAccountOrPaymentMethod,
    agreedToSellerPolicy,
    role: 'seller',
  };

  // Handle avatar upload if provided
  if (req.body.avatar) {
    userData.avatar = {
      public_id: 'seller_avatar_' + Date.now(),
      url: req.body.avatar,
    };
  }

  const user = await User.create(userData);

  sendToken(user, 201, res);
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
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
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

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
  });
});
