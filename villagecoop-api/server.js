const mysql = require('mysql2');

// สร้างการเชื่อมต่อกับ MySQL
const connection = mysql.createConnection({
   host: 'localhost',   // ที่อยู่ของเซิร์ฟเวอร์ MySQL
   user: 'root',        // ชื่อผู้ใช้ MySQL
   password: 'your_password', // รหัสผ่านของ MySQL
   database: 'villagecoop'   // ชื่อฐานข้อมูลที่คุณต้องการเชื่อมต่อ
});

// เปิดการเชื่อมต่อ
connection.connect((err) => {
   if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
   }
   console.log('Connected to MySQL database');
});

// ตัวอย่างเส้นทาง (route)
const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send('Hello from villagecoop API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
