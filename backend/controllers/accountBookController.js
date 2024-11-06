const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const updateBalance = async (req, res) => {
  const { amount } = req.body;

  try {
    let pool = await sql.connect(sqlConfig);
    await pool.request()
      .input('amount', sql.Float, amount)
      .query(`UPDATE AccountBook SET totalBalance = totalBalance + @amount`);

    res.status(201).json({ message: 'Balance updated successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

const getTotalBalance = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request()
      .query(`SELECT TOP 1 totalBalance FROM AccountBook ORDER BY createdAt DESC`);

    if (result.recordset.length > 0) {
      res.status(200).json(result.recordset[0]);
    } else {
      res.status(404).json({ message: 'No total balance found' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

module.exports = {
  updateBalance,
  getTotalBalance
};