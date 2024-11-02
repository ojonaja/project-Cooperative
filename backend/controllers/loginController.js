const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const loginUser = async (req, res) => {
    const { email, password } = req.body; // รับข้อมูล email และ password จากผู้ใช้

    try {
        let pool = await sql.connect(sqlConfig);
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password) // ควรจะทำการเข้ารหัสก่อนถ้ามีการจัดเก็บ
            .query(`SELECT * FROM Members WHERE email = @email 
                        AND password = @password`);

        if (result.recordset.length > 0) {
            // ถ้าพบผู้ใช้
            res.status(200).json({ message: 'Login successful', user: result.recordset[0] });
        } else {
            // ถ้าไม่พบผู้ใช้
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };
