const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ตั้งค่าการเชื่อมต่อ MSSQL
const dbConfig = {
  user: 'yourUsername',
  password: 'yourPassword',
  server: 'yourServer',
  database: 'yourDatabase',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Route สำหรับดึงข้อมูลการฝาก-ถอนและดอกเบี้ย
app.get('/api/report', async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query(`
      SELECT depositAmount, withdrawalAmount, annualInterest 
      FROM yourTable
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
