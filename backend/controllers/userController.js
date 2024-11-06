const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const getAllUsers = async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().query(`SELECT * FROM Members`);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const updateUser = async (req, res) => {
    const { idCard, name, address, age, phone, email, role } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);

        // ตรวจสอบว่าเป็น admin หรือเป็นเจ้าของข้อมูลเอง
        if (req.user.role === 'admin' || req.user.idCard === idCard) {
            await pool.request()
                .input('idCard', sql.NVarChar, idCard)
                .input('name', sql.NVarChar, name)
                .input('address', sql.NVarChar, address)
                .input('age', sql.Int, age)
                .input('phone', sql.NVarChar, phone)
                .input('email', sql.NVarChar, email)
                .input('role', sql.NVarChar, role)
                .query(`UPDATE Members SET name = @name, address = @address, age = @age, phone = @phone, email = @email, role = @role WHERE idCard = @idCard`);

            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const deleteUser = async (req, res) => {
    const { idCard } = req.params;

    try {
        let pool = await sql.connect(sqlConfig);

        // ตรวจสอบว่าเป็น admin เท่านั้นที่สามารถลบผู้ใช้ได้
        if (req.user.role === 'admin') {
            // ลบข้อมูลที่เกี่ยวข้องในตาราง Transactions ก่อน
            await pool.request()
                .input('idCard', sql.NVarChar, idCard)
                .query(`DELETE FROM Transactions WHERE idCard = @idCard`);

            // ลบผู้ใช้
            await pool.request()
                .input('idCard', sql.NVarChar, idCard)
                .query(`DELETE FROM Members WHERE idCard = @idCard`);

            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

module.exports = { getAllUsers, updateUser, deleteUser };