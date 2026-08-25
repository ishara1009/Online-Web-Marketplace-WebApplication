const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const fs = require('fs/promises');
const path = require('path');

const imageRecord = (file) => ({ public_id: file.filename, url: `/uploads/products/${file.filename}` });
const removeImages = async (images = []) => Promise.all(images.map(async (image) => {
  if (!image?.public_id) return;
  try { await fs.unlink(path.join(__dirname, '../../uploads/products', path.basename(image.public_id))); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}));
const normalizeBody = (body) => {
  const data = { ...body };
  if (data.discountPrice === '') data.discountPrice = null;
  ['price', 'discountPrice', 'stock'].forEach((key) => {
    if (data[key] === undefined) delete data[key];
    else if (data[key] === null) data[key] = null;
    else data[key] = Number(data[key]);
  });
  if (data.stock === 0) data.status = 'out_of_stock';
  if (data.stock > 0 && data.status === 'out_of_stock') data.status = 'active';
  return data;
};

// Create new product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  if (!req.files?.image?.[0]) return next(new ErrorHandler('A main product image is required', 400));
  const data = normalizeBody(req.body);
  if (data.discountPrice != null && data.discountPrice >= data.price) {
    await removeImages([...(req.files.image || []), ...(req.files.images || [])].map(imageRecord));
    return next(new ErrorHandler('Discount price must be less than the regular price', 400));
  }
  data.seller = req.user.id;
  data.images = [...req.files.image, ...(req.files.images || [])].map(imageRecord);
  let product;
  try { product = await Product.create(data); } catch (error) { await removeImages(data.images); throw error; }

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = Math.min(Math.max(Number(req.query.limit) || 12, 1), 50);
  const visibility = { status: { $ne: 'inactive' }, isActive: { $ne: false } };
  const countQuery = { ...visibility };
  if (req.query.keyword) countQuery.name = { $regex: req.query.keyword, $options: 'i' };
  if (req.query.category) countQuery.category = req.query.category;
  const productsCount = await Product.countDocuments(countQuery);

  const apiFeatures = new APIFeatures(Product.find(visibility), req.query)
    .search()
    .filter();
  const sortMap = { price_asc: { price: 1 }, price_desc: { price: -1 }, oldest: { createdAt: 1 }, newest: { createdAt: -1 } };
  apiFeatures.query = apiFeatures.query.sort(sortMap[req.query.sort] || sortMap.newest);
  apiFeatures.pagination(resPerPage);

  const products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    products,
  });
});

// Get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id, status: { $ne: 'inactive' }, isActive: { $ne: false } }).populate('seller', 'name');

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const data = normalizeBody(req.body);
  if (data.discountPrice != null && data.discountPrice >= data.price) {
    await removeImages([...(req.files?.image || []), ...(req.files?.images || [])].map(imageRecord));
    return next(new ErrorHandler('Discount price must be less than the regular price', 400));
  }
  const newFiles = [...(req.files?.image || []), ...(req.files?.images || [])];
  const oldImages = product.images || [];
  if (newFiles.length) data.images = newFiles.map(imageRecord);
  try { product = await Product.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  }); } catch (error) { await removeImages(data.images); throw error; }
  if (newFiles.length) await removeImages(oldImages);

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await product.deleteOne();
  await removeImages(product.images);

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Admin catalog with filtering, sorting, pagination, and dashboard totals.
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
  const query = {};
  if (req.query.search) query.name = { $regex: req.query.search, $options: 'i' };
  if (req.query.category) query.category = req.query.category;
  if (req.query.status) query.status = req.query.status;
  const sortMap = { price_asc: { price: 1 }, price_desc: { price: -1 }, oldest: { createdAt: 1 }, newest: { createdAt: -1 } };
  const [products, productsCount, total, active, outOfStock, lowStock] = await Promise.all([
    Product.find(query).sort(sortMap[req.query.sort] || sortMap.newest).skip((page - 1) * limit).limit(limit).populate('seller', 'name email'),
    Product.countDocuments(query), Product.countDocuments(), Product.countDocuments({ status: 'active' }),
    Product.countDocuments({ $or: [{ status: 'out_of_stock' }, { stock: 0 }] }), Product.countDocuments({ stock: { $gt: 0, $lte: 5 } }),
  ]);
  res.status(200).json({ success: true, products, productsCount, page, pages: Math.ceil(productsCount / limit), summary: { total, active, outOfStock, lowStock } });
});

exports.getAdminProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('seller', 'name email');
  if (!product) return next(new ErrorHandler('Product not found', 404));
  res.status(200).json({ success: true, product });
});

// Create/Update product review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get product reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete product review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});
