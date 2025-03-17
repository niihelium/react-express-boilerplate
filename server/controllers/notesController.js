const Note = require('../models/noteModel');

// Fetch all notes for authenticated user
const getNotes = async (req, res) => {
  try {
      console.log(req);
      const notes = await Note.findAll(req.user_id);
      res.json(notes);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
      const noteId = await Note.create(title, content, req.userId);
      const newNote = { id: noteId, title, content, userId: req.userId };
      res.status(201).json(newNote);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

/**
 * Checks if the note belongs to a different user than the one making the request.
 * 
 * @param {Object} note - The note object containing a userId field.
 * @param {Object} req - The request object containing a userId field.
 * @returns {boolean} - Returns true if the note's userId does not match the request's userId.
 */
const isWrongUser = (note, req) => {
  return note.user_id !== req.userId;
};

// Fetch a single note by ID
const getNoteById = async (req, res) => {
  try {
      const note = await Note.findById(req.params.id);
      if (!note || isWrongUser(note, req)) {
          return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
      const note = await Note.findById(req.params.id);
      if (!note || isWrongUser(note, req)) {
          return res.status(404).json({ message: 'Note not found' });
      }
      await Note.update(req.params.id, req.body.title || note.title, req.body.content || note.content);
      const updatedNote = { ...note, title: req.body.title || note.title, content: req.body.content || note.content };
      res.json(updatedNote);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  try {
      const note = await Note.findById(req.params.id);
      if (!note || isWrongUser(note, req)) {
          return res.status(404).json({ message: 'Note not found' });
      }
      await Note.delete(req.params.id);
      res.json({ message: 'Note deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
