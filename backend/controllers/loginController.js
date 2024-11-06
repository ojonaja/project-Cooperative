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
                const token = jwt.sign({ idCard: user.idCard, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
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

module.exports = { loginUser };