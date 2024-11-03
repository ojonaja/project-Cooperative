const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// การตั้งค่าการเชื่อมต่อฐานข้อมูล MSSQL
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server_address',
  database: 'your_database_name',
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
};

sql.connect(dbConfig, (err) => {
  if (err) console.log(err);
  else console.log("Connected to MSSQL");
});

// API สำหรับดึงข้อมูลโปรไฟล์ตาม ID
app.get('/api/profile/:id', async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query(`SELECT * FROM Users WHERE id = ${req.params.id}`);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ตั้งค่าให้ API Server ทำงานบนพอร์ต 3000
app.listen(3000, () => console.log('Server running on port 3000'));
