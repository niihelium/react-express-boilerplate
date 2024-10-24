const express = require('express');
const { getNotes, createNote, getNoteById, updateNote, deleteNote } = require('../controllers/notesController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch all notes for the authenticated user
router.get('/', verifyToken, getNotes);

// Create a new note
router.post('/', verifyToken, createNote);

// Get a note by ID
router.get('/:id', verifyToken, getNoteById);

// Update a note by ID
router.put('/:id', verifyToken, updateNote);

// Delete a note by ID
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;
