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
    },
    // Fetch a single note by ID
    async findById(id) {
        const query = 'SELECT id, title, content, user_id FROM notes WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        return rows[0] || null; // Return the first row or null if not found
    },
    // Update a note by ID
    async update(id, title, content) {
        const query = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
        await pool.query(query, [title, content, id]);
    },
    // Delete a note by ID
    async delete(id) {
        const query = 'DELETE FROM notes WHERE id = ?';
        await pool.query(query, [id]);
    }
}

module.exports = Note;