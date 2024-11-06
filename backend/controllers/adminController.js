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

const getUserTransactions = async (req, res) => {
  const { idCard } = req.params;

  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request()
      .input('idCard', sql.NVarChar, idCard)
      .query(`SELECT * FROM Transactions WHERE idCard = @idCard ORDER BY transactionDate DESC`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

const getAllComplaints = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let result = await pool.request().query(`SELECT * FROM Complaints ORDER BY complaintDate DESC`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    sql.close();
  }
};

module.exports = { getAllUsers, getUserTransactions, getAllComplaints };