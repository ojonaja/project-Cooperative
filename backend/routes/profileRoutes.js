const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/authmiddleware');

router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, updateProfile);

module.exports = router;