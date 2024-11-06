const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const getUserTransactions = async (req, res) => {
    const { idCard } = req.user;

    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .query(`
                SELECT t.transactionDate AS date, t.amount, t.transactionType
                FROM Transactions t
                WHERE t.idCard = @idCard
            `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const getAllTransactions = async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().query(`
            SELECT t.transactionDate AS date, t.amount, t.transactionType
            FROM Transactions t
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const getAllTransactionsForAdmin = async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().query(`
            SELECT t.transactionDate AS date, t.amount, t.transactionType, m.name AS [user]
            FROM Transactions t
            JOIN Members m ON t.idCard = m.idCard
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const deposit = async (req, res) => {
    const { idCard, amount } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .input('amount', sql.Float, amount)
            .input('transactionType', sql.NVarChar, 'deposit')
            .query(`INSERT INTO Transactions (idCard, amount, transactionType) VALUES (@idCard, @amount, @transactionType)`);

        const result = await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .query(`
                SELECT t.transactionDate AS date, t.amount, t.transactionType
                FROM Transactions t
                WHERE t.idCard = @idCard AND t.transactionType = 'deposit'
            `);

        res.status(200).json({ message: 'Deposit successful', transactions: result.recordset });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const withdraw = async (req, res) => {
    const { idCard, amount } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);

        // ตรวจสอบยอดเงินคงเหลือ
        const balanceResult = await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .query(`
                SELECT SUM(amount) AS balance
                FROM Transactions
                WHERE idCard = @idCard
            `);

        const balance = balanceResult.recordset[0].balance;

        if (balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .input('amount', sql.Float, -amount) // Negative amount for withdrawal
            .input('transactionType', sql.NVarChar, 'withdraw')
            .query(`INSERT INTO Transactions (idCard, amount, transactionType) VALUES (@idCard, @amount, @transactionType)`);

        const result = await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .query(`
                SELECT t.transactionDate AS date, t.amount, t.transactionType
                FROM Transactions t
                WHERE t.idCard = @idCard AND t.transactionType = 'withdraw'
            `);

        res.status(200).json({ message: 'Withdrawal successful', transactions: result.recordset });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

module.exports = { getUserTransactions, getAllTransactions, getAllTransactionsForAdmin, deposit, withdraw };