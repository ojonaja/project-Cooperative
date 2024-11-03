// controllers/registerController.js
const sql = require('mssql');
const bcrypt = require('bcrypt');
const { sqlConfig } = require('../config/dbconfig');

const registerMember = async (req, res) => {
    const { name, address, age, idCard, phone, email, password } = req.body;

    try {
        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('address', sql.NVarChar, address)
            .input('age', sql.Int, age)
            .input('idCard', sql.NVarChar, idCard)
            .input('phone', sql.NVarChar, phone)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword) // ใช้รหัสผ่านที่เข้ารหัสแล้ว
            .query(`INSERT INTO Members (name, address, age, idCard, phone, email, password)
                   VALUES (@name, @address, @age, @idCard, @phone, @email, @password)`);

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerMember };