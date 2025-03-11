// Single note model

const pool = require('../db');

const Note = {
    async create(title, content, userId) {
        const query = 'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)';
        const result = await pool.query(query, [title, content, userId]);
        return result.insertId; // Return the inserted note ID
    },
    async findAll(userId) {
        const query = 'SELECT id, title, content, created_at FROM notes WHERE user_id = ?';
        const rows = await pool.query(query, [userId]);
        return rows;
    }
}

module.exports = Note;