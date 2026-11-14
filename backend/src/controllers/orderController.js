const Order = require('../models/Order');
const Product = require('../models/Product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { orderItems = [], shippingInfo, paymentInfo = {} } = req.body;
  if (!orderItems.length) return next(new ErrorHandler('Your cart is empty', 400));
  if (!shippingInfo?.address || !shippingInfo?.city || !shippingInfo?.state || !shippingInfo?.country || !shippingInfo?.zipCode || !shippingInfo?.phone) {
    return next(new ErrorHandler('Complete shipping information is required', 400));
  }
  if (paymentInfo.method !== 'Cash on Delivery') {
    return next(new ErrorHandler('Online payment is not configured. Please select Cash on Delivery.', 400));
  }

  const requested = new Map();
  for (const item of orderItems) {
    const quantity = Number(item.quantity);
    if (!item.product || !Number.isInteger(quantity) || quantity < 1) return next(new ErrorHandler('Invalid cart item quantity', 400));
    requested.set(String(item.product), (requested.get(String(item.product)) || 0) + quantity);
  }
  const products = await Product.find({ _id: { $in: [...requested.keys()] }, status: { $ne: 'inactive' }, isActive: { $ne: false } });
  if (products.length !== requested.size) return next(new ErrorHandler('One or more products are no longer available', 400));

  const normalizedItems = products.map(product => {
    const quantity = requested.get(String(product._id));
    if (product.stock < quantity || product.status === 'out_of_stock') throw new ErrorHandler(`${product.name} does not have enough stock`, 409);
    return { product: product._id, name: product.name, quantity, price: product.discountPrice ?? product.price, image: product.images?.[0]?.url || '/images/product-placeholder.png' };
  });
  const reserved = [];
  try {
    for (const item of normalizedItems) {
      const result = await Product.updateOne({ _id: item.product, stock: { $gte: item.quantity } }, { $inc: { stock: -item.quantity } });
      if (!result.modifiedCount) throw new ErrorHandler(`${item.name} does not have enough stock`, 409);
      reserved.push(item);
    }
    const itemsPrice = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingPrice = itemsPrice > 50 ? 0 : 5.99;
    const taxPrice = Number((itemsPrice * 0.08).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));
    const order = await Order.create({ orderItems: normalizedItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymentInfo: { method: 'Cash on Delivery', status: 'Pending' }, user: req.user._id });
    return res.status(201).json({ success: true, order });
  } catch (error) {
    await Promise.all(reserved.map(item => Product.updateOne({ _id: item.product }, { $inc: { stock: item.quantity } })));
    throw error;
  }
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }
  if (req.user.role !== 'admin' && String(order.user._id) !== String(req.user.id)) {
    return next(new ErrorHandler('You are not allowed to access this order', 403));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders - Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update order status - Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400));
  }

  order.orderStatus = req.body.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Delete order - Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});
