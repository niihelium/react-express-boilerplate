const Note = require('../models/noteModel');

// Fetch all notes for authenticated user
const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.userId });
  res.json(notes);
};

// Create a new note
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ userId: req.userId, title, content });
  await newNote.save();
  res.status(201).json(newNote);
};

/**
 * Checks if the note belongs to a different user than the one making the request.
 * 
 * @param {Object} note - The note object containing a userId field.
 * @param {Object} req - The request object containing a userId field.
 * @returns {boolean} - Returns true if the note's userId does not match the request's userId.
 */
const isWrongUser = (note, req) => {
  return note.userId.toString() !== req.userId;
};

// Fetch a single note by ID
const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || isWrongUser(note, req)) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
};

// Update a note by ID
const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || isWrongUser(note, req)) {
    return res.status(404).json({ message: 'Note not found' });
  }
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  await note.save();
  res.json(note);
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || isWrongUser(note, req)) {
    return res.status(404).json({ message: 'Note not found' });
  }
  await note.deleteOne();
  res.json({ message: 'Note deleted successfully' });
};

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
