const express = require('express');
const router = express.Router();

const {
  registerUser,
  registerSeller,
  loginUser,
  logoutUser,
  getUserProfile,
  updatePassword,
  createAdmin,
  updateProfile,
  updateAvatar,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  deactivateAccount,
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const avatarUpload = require('../middlewares/avatarUpload');

// Only standard users can self-register. Admin accounts are provisioned by script.
router.route('/register/user').post(registerUser);
router.route('/register/seller').post(registerSeller);

// Common login route for users and admins
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);
router.route('/me/avatar').put(isAuthenticatedUser, avatarUpload.single('avatar'), updateAvatar);
router.route('/me/deactivate').put(isAuthenticatedUser, deactivateAccount);

router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

router
  .route('/admin/create')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createAdmin);

router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
