// app.js
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // โหลด environment variables จาก .env

// Import routes
const indexRouter = require('./routes/index');

// สร้างแอป Express
const app = express();

// Middleware ที่ใช้ในแอป
app.use(logger('dev'));  // Logger สำหรับแสดง log ของการ request
app.use(express.json());  // แปลง JSON request body เป็น JavaScript object
app.use(express.urlencoded({ extended: false }));  // แปลง URL-encoded body เป็น JavaScript object
app.use(cookieParser());  // Parse คุกกี้จาก HTTP requests
app.use(express.static(path.join(__dirname, 'public')));  // กำหนดโฟลเดอร์ที่เก็บไฟล์ static
app.use(cors());  // อนุญาตให้มีการเชื่อมต่อข้ามโดเมน

// Routes
app.use('/', indexRouter);  // กำหนดให้ใช้ indexRouter สำหรับเส้นทาง "/"

// จัดการข้อผิดพลาด 404
app.use((req, res, next) => {
   const error = new Error('Not Found');
   error.status = 404;
   next(error);
});

// Error handler
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   res.json({
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err : {}  // แสดง error ใน development mode เท่านั้น
   });
});

module.exports = app;
