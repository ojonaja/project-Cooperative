// controllers/loginController.js
const sql = require('mssql');
const bcrypt = require('bcrypt');
const { sqlConfig } = require('../config/dbconfig');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    console.log('Login attempt with email:', email); // Log the email

    try {
        let pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`SELECT * FROM Members WHERE email = @email`);

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                res.status(200).json({ message: 'Login successful', user });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginUser };