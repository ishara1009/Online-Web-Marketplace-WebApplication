const express = require('express');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();
router.use(isAuthenticatedUser, authorizeRoles('user'));
router.route('/').get(getWishlist);
router.route('/:productId').post(addToWishlist).delete(removeFromWishlist);
module.exports = router;
