//registers the routes for the register API
const sql = require('mssql');
const express = require('express');
const router = express.Router();
const { registerMember } = require('../controllers/registerController');

// POST API สำหรับการลงทะเบียน
router.post('/', registerMember);

module.exports = router;
