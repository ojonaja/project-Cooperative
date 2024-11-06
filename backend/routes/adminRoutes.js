const express = require('express');
const router = express.Router();
const { getAllUsers, getUserTransactions, getAllComplaints } = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authmiddleware');

router.get('/users', authenticateToken, authorizeAdmin, getAllUsers);
router.get('/transactions/:idCard', authenticateToken, authorizeAdmin, getUserTransactions);
router.get('/complaints', authenticateToken, authorizeAdmin, getAllComplaints);

module.exports = router;