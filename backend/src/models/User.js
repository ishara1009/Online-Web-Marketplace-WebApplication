const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        default: 'default_avatar',
      },
      url: {
        type: String,
        default: 'https://via.placeholder.com/150',
      },
    },
    role: {
      type: String,
      enum: ['customer', 'seller', 'admin'],
      default: 'customer',
    },
    phone: {
      type: String,
      maxLength: [15, 'Phone number cannot exceed 15 characters'],
    },
    address: {
      type: String,
      maxLength: [200, 'Address cannot exceed 200 characters'],
    },
    // Customer-specific fields
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    // Seller-specific fields
    ownerName: {
      type: String,
      maxLength: [50, 'Owner name cannot exceed 50 characters'],
    },
    shopName: {
      type: String,
      maxLength: [100, 'Shop name cannot exceed 100 characters'],
    },
    businessAddress: {
      type: String,
      maxLength: [200, 'Business address cannot exceed 200 characters'],
    },
    nicOrBusinessRegNo: {
      type: String,
      maxLength: [50, 'NIC/Business Reg No cannot exceed 50 characters'],
    },
    bankAccountOrPaymentMethod: {
      type: String,
      maxLength: [100, 'Payment method cannot exceed 100 characters'],
    },
    agreedToSellerPolicy: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model('User', userSchema);
