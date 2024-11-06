// dbconfig.js
require('dotenv').config(); // โหลด environment variables จาก .env
const sql = require('mssql');

// อ่านค่าจาก .env
const sqlConfig = {
    user: process.env.USER, // ชื่อผู้ใช้ SQL Server
    password: process.env.PASSWORD, // รหัสผ่านของผู้ใช้
    server: process.env.HOST, // ชื่อโฮสต์ของ SQL Server
    database: process.env.DB, // ชื่อฐานข้อมูล
    port: parseInt(process.env.SQL_PORT), // พอร์ต SQL Server
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
    options: {
        encrypt: false, // ใช้ true สำหรับ Azure SQL Database1
        trustServerCertificate: true, // ใช้ true ในการพัฒนาเพื่อข้ามการตรวจสอบใบรับรอง
    },
};

// ฟังก์ชันสำหรับเชื่อมต่อกับฐานข้อมูล
const connectToDatabase = async () => {
    try {
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server database');
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);
    }
};

// เรียกใช้ฟังก์ชันเพื่อเชื่อมต่อกับฐานข้อมูล
connectToDatabase();

// ส่งออก sql และ sqlConfig เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = { sql, sqlConfig };
