const User = require('../models/User');
const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const populateWishlist = query => query.populate({
  path: 'wishlist',
  match: { status: { $ne: 'inactive' }, isActive: { $ne: false } },
  select: 'name description category price discountPrice images stock status sku',
});

exports.getWishlist = catchAsyncErrors(async (req, res) => {
  const user = await populateWishlist(User.findById(req.user.id).select('wishlist'));
  res.status(200).json({ success: true, products: (user.wishlist || []).filter(Boolean) });
});

exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.productId, status: { $ne: 'inactive' }, isActive: { $ne: false } });
  if (!product) return next(new ErrorHandler('Product not found or unavailable', 404));
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { wishlist: product._id } }, { runValidators: true });
  res.status(200).json({ success: true, message: 'Product added to your wishlist' });
});

exports.removeFromWishlist = catchAsyncErrors(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { wishlist: req.params.productId } });
  res.status(200).json({ success: true, message: 'Product removed from your wishlist' });
});
