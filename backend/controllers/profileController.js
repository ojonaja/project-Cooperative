const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const getProfile = async (req, res) => {
  const { idCard } = req.user;

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request()
      .input('idCard', sql.NVarChar, idCard)
      .query(`SELECT name, address, age, idCard, phone, email FROM Members WHERE idCard = @idCard`);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
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

const updateProfile = async (req, res) => {
  const { idCard } = req.user;
  const { name, address, age, phone, email } = req.body;

  try {
    let pool = await sql.connect(sqlConfig);
    await pool.request()
      .input('idCard', sql.NVarChar, idCard)
      .input('name', sql.NVarChar, name)
      .input('address', sql.NVarChar, address)
      .input('age', sql.Int, age)
      .input('phone', sql.NVarChar, phone)
      .input('email', sql.NVarChar, email)
      .query(`UPDATE Members SET name = @name, address = @address, age = @age, phone = @phone, email = @email WHERE idCard = @idCard`);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

module.exports = { getProfile, updateProfile };