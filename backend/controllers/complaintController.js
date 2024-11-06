const sql = require('mssql');
const { sqlConfig } = require('../config/dbconfig');

const getAllComplaints = async (req, res) => {
    try {
        let pool = await sql.connect(sqlConfig);
        let result = await pool.request().query(`
            SELECT c.complaintID, c.complaintText, c.complaintDate, m.name, m.email, c.idCard
            FROM Complaints c
            JOIN Members m ON c.idCard = m.idCard
        `);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const submitComplaint = async (req, res) => {
    const { idCard, complaintText } = req.body;

    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('idCard', sql.NVarChar, idCard)
            .input('complaintText', sql.NVarChar, complaintText)
            .query(`INSERT INTO Complaints (idCard, complaintText, complaintDate) VALUES (@idCard, @complaintText, GETDATE())`);

        res.status(200).json({ message: 'Complaint submitted successfully' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

const deleteComplaint = async (req, res) => {
    const { complaintID } = req.params;

    try {
        let pool = await sql.connect(sqlConfig);
        await pool.request()
            .input('complaintID', sql.Int, complaintID)
            .query(`DELETE FROM Complaints WHERE complaintID = @complaintID`);

        res.status(200).json({ message: 'Complaint deleted successfully' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        sql.close();
    }
};

module.exports = { getAllComplaints, submitComplaint, deleteComplaint };