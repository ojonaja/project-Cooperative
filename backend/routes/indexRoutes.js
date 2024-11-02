// indexRoutes.js
const sql = require('mssql');
const express = require('express');
const router = express.Router();

// กำหนดเส้นทางตัวอย่าง
router.get('/', (req, res) => {
    res.send('Hello from indexRoutes');
    });

    module.exports = router;