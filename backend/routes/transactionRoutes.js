const express = require('express');
const router = express.Router();
const { getUserTransactions, getAllTransactions, getAllTransactionsForAdmin, deposit, withdraw } = require('../controllers/transactionController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authmiddleware');

router.get('/user', authenticateToken, getUserTransactions);
router.get('/all', authenticateToken, getAllTransactions);
router.get('/admin', authenticateToken, authorizeAdmin, getAllTransactionsForAdmin);
router.post('/deposit', authenticateToken, deposit);
router.post('/withdraw', authenticateToken, withdraw);

module.exports = router;