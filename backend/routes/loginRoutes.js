const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

// POST API สำหรับการเข้าสู่ระบบ
router.post('/', loginUser);

module.exports = router;