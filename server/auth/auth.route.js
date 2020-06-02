const router = require('express').Router();

const {
  registerUser,
  registerAdmin,
  verifyAccount,
  login,
  tokenRefresher,
  logout,
  viewProfile,
  updateProfile,
  contactUs,
  createNewPassword,
  forgetPasswordSendToken,
  forgetPasswordRecieveToken,
  resetPassword,
  adminLogin,
} = require('./auth.controller');

const { verifyToken } = require('../middleware/authorization');

router.post('/admin/login', adminLogin);
router.get('/view-profile', verifyToken, viewProfile);
router.get('/logout/:accessToken/:refreshToken', verifyToken, logout);

router.post('/register/user', registerUser);
router.post('/register/admin', registerAdmin);
router.post('/login', login);
router.get('/verify-account', verifyAccount);
router.get('/token-refresher', tokenRefresher);
router.post('/update-details', verifyToken, updateProfile);
router.post('/contact-us', verifyToken, contactUs);

router.post('/forgetPassword', forgetPasswordSendToken);
router.get('/forgetPassword/:token', forgetPasswordRecieveToken);
router.post('/resetPassword/:token', resetPassword);
router.post('/createNewPassowrd', verifyToken, createNewPassword);

module.exports = router;
