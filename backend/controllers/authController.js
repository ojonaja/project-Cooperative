const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sqlConfig } = require('../config/dbconfig');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT * FROM Members WHERE email = @email`);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ idCard: user.idCard, email: user.email, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const registerUser = async (req, res) => {
    const { name, address, age, idCard, phone, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let pool = await sql.connect(sqlConfig);

        await pool.request()
            .input('name', sql.NVarChar, name)
            .input('address', sql.NVarChar, address)
            .input('age', sql.Int, age)
            .input('idCard', sql.NVarChar, idCard)
            .input('phone', sql.NVarChar, phone)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .input('role', sql.NVarChar, 'user') // ตั้งค่า role เป็น user โดยอัตโนมัติ
            .query(`INSERT INTO Members (name, address, age, idCard, phone, email, password, role) VALUES (@name, @address, @age, @idCard, @phone, @email, @password, @role)`);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const resetPassword = async (req, res) => {
    const { email, idCard, newPassword } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('idCard', sql.NVarChar, idCard)
            .query(`SELECT * FROM Members WHERE email = @email AND idCard = @idCard`);

        if (result.recordset.length > 0) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.request()
                .input('email', sql.NVarChar, email)
                .input('idCard', sql.NVarChar, idCard)
                .input('newPassword', sql.NVarChar, hashedPassword)
                .query(`UPDATE Members SET password = @newPassword WHERE email = @email AND idCard = @idCard`);

            res.status(200).json({ message: 'Password reset successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

module.exports = { loginUser, registerUser, resetPassword };