const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);

router
  .route('/admin/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin', 'seller'), createProduct);

router
  .route('/admin/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin', 'seller'), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin', 'seller'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route('/reviews').get(getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview);

module.exports = router;
