const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

router.get('/all', authenticateToken, authorizeAdmin, getAllUsers);
router.put('/update', authenticateToken, updateUser);
router.delete('/delete/:idCard', authenticateToken, authorizeAdmin, deleteUser);

module.exports = router;