// controllers/registerController.js
const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const registerMember = async (req, res) => {
    const { name, address, age, idCard, phone, email, password } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('address', sql.NVarChar, address)
            .input('age', sql.Int, age)
            .input('idCard', sql.NVarChar, idCard)
            .input('phone', sql.NVarChar, phone)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password) // ควรจะทำการเข้ารหัสก่อนถ้ามีการจัดเก็บ
            .query(`INSERT INTO Members (name, address, age, idCard, phone, email, password)
                   VALUES (@name, @address, @age, @idCard, @phone, @email, @password)`);

        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerMember };
