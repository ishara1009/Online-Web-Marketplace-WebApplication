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
  getAdminProducts,
  getAdminProductDetails,
  getSellerProducts,
  getSellerProductDetails,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} = require('../controllers/productController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const productUpload = require('../middlewares/productUpload');

router.route('/products').get(getAllProducts);

router.route('/seller/products')
  .get(isAuthenticatedUser, authorizeRoles('seller'), getSellerProducts)
  .post(isAuthenticatedUser, authorizeRoles('seller'), productUpload, createSellerProduct);
router.route('/seller/products/:id')
  .get(isAuthenticatedUser, authorizeRoles('seller'), getSellerProductDetails)
  .put(isAuthenticatedUser, authorizeRoles('seller'), productUpload, updateSellerProduct)
  .delete(isAuthenticatedUser, authorizeRoles('seller'), deleteSellerProduct);

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts)
  .post(isAuthenticatedUser, authorizeRoles('admin'), productUpload, createProduct);

router
  .route('/admin/products/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProductDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), productUpload, updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/products/review').put(isAuthenticatedUser, createProductReview);
router.route('/products/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
router.route('/products/:id').get(getProductDetails);

module.exports = router;
