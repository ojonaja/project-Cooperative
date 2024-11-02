// app.js
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();  // โหลด environment variables

// นำเข้า routes
const indexRouter = require('./routes/indexRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');

// สร้างแอป Express
const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Routes
app.use('/', indexRouter);
app.use('/api/register', registerRoutes); // ให้แน่ใจว่ากำหนดเป็น /api/register
app.use('/api/login', loginRoutes); // ให้แน่ใจว่ากำหนดเป็น /api/login

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
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;
