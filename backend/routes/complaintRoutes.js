const express = require('express');
const router = express.Router();
const { getAllComplaints, submitComplaint, deleteComplaint } = require('../controllers/complaintController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authmiddleware');

router.get('/', authenticateToken, authorizeAdmin, getAllComplaints);
router.post('/submit', authenticateToken, submitComplaint);
router.delete('/:complaintID', authenticateToken, authorizeAdmin, deleteComplaint);

module.exports = router;