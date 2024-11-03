// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const { registerMember } = require('../controllers/registerController');

router.post('/', registerMember);

module.exports = router;