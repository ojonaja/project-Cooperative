const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sqlConfig } = require('../config/dbconfig');

const registerMember = async (req, res) => {
    const { name, address, age, idCard, phone, email, password } = req.body;

    if (!idCard || !name || !address || !age || !phone || !email || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let pool = await sql.connect(sqlConfig);

        let checkResult = await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .query(`SELECT idCard FROM Members WHERE idCard = @idCard`);

        if (checkResult.recordset.length > 0) {
            return res.status(400).json({ message: 'ID Card already exists' });
        }

        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('address', sql.NVarChar, address)
            .input('age', sql.Int, age)
            .input('idCard', sql.NVarChar, idCard)
            .input('phone', sql.NVarChar, phone)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .input('role', sql.NVarChar, 'User')
            .query(`INSERT INTO Members (name, address, age, idCard, phone, email, password, role)
                   VALUES (@name, @address, @age, @idCard, @phone, @email, @password, @role)`);

        const token = jwt.sign({ idCard, email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ message: 'Registration successful', token });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error' });
    } finally {
        sql.close();
    }
};

module.exports = { registerMember };