const router = require('express').Router();

const {
  registerUser,
  registerAdmin,
  verifyAccount
} = require('./auth.controller');

router.post('/register/user', registerUser);
router.post('/register/admin', registerAdmin);
router.get('/verifyAccount', verifyAccount);

module.exports = router;
