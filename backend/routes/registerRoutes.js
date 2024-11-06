const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');
const { registerMember } = require('../controllers/registerController');

router.post('/login', loginUser);
router.post('/register', registerMember);

module.exports = router;