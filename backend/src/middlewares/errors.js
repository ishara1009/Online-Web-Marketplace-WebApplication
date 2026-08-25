const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
  if (err.name === 'MulterError' || err.message?.startsWith('Only JPG')) {
    return res.status(400).json({ success: false, message: err.code === 'LIMIT_FILE_SIZE' ? 'Each image must be 5 MB or smaller' : err.message });
  }
  let error = err;
  if (err.name === 'CastError') error = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  if (err.name === 'ValidationError') error = new ErrorHandler(Object.values(err.errors).map(value => value.message).join(', '), 400);
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'value';
    error = new ErrorHandler(field === 'sku' ? 'This SKU / product code is already in use' : `This ${field} is already in use`, 400);
  }
  if (err.name === 'JsonWebTokenError') error = new ErrorHandler('Your session is invalid. Please sign in again.', 401);
  if (err.name === 'TokenExpiredError') error = new ErrorHandler('Your session has expired. Please sign in again.', 401);

  const statusCode = error.statusCode || 500;
  const response = { success: false, message: error.message || 'Internal Server Error' };
  if (process.env.NODE_ENV === 'development') response.stack = error.stack;
  return res.status(statusCode).json(response);
};
