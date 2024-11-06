const express = require('express');
const router = express.Router();
const { updateBalance, getTotalBalance } = require('../controllers/accountBookController');

router.post('/updateBalance', updateBalance);
router.get('/totalBalance', getTotalBalance);

module.exports = router;