const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxLength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
      maxLength: [2000, 'Description cannot exceed 2000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
      max: [100, 'Discount cannot exceed 100%'],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: [
        'Electronics',
        'Fashion',
        'Home & Garden',
        'Sports',
        'Books',
        'Toys',
        'Automotive',
        'Beauty',
        'Health',
        'Food',
        'Other',
      ],
    },
    stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, 'Please enter a product SKU'],
      unique: true,
      uppercase: true,
      trim: true,
      maxLength: [80, 'SKU cannot exceed 80 characters'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock'],
      default: 'active',
      index: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);
