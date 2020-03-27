const router = require('express').Router();

const {
  registerUser,
  registerAdmin,
  verifyAccount,
  login
} = require('./auth.controller');

router.post('/register/user', registerUser);
router.post('/register/admin', registerAdmin);
router.post('/login', login);
router.get('/verifyAccount', verifyAccount);

module.exports = router;
