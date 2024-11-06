const express = require('express');
const router = express.Router();
const { loginUser, registerUser, resetPassword } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/reset-password', resetPassword);

module.exports = router;