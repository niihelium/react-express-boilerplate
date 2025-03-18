const pool = require('../db');

const User = {

    async create(username, email, hashedPassword, role = 'user') {
        const query = `
            INSERT INTO users (username, email, password, role)
            VALUES (?, ?, ?, ?)
        `;
        const result = await pool.query(query, [username, email, hashedPassword, role]);
        return result.insertId.toString();
    },
    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const rows = await pool.query(query, [username]);
        return rows[0];
    },
    async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        try {
            const rows = await pool.query(query, [email]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    },
    async findAll() {
        const query = 'SELECT id, username, email, role, created_at FROM users';
        const rows = await pool.query(query);
        return rows;
    }
};

module.exports = User;