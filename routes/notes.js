// routes/notes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Note from '../models/note.js';

const router = express.Router();

// Middleware to verify authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, 'RD0dmwf1ZELJf6zBgTU9GXXTYCGdu92d');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// Get all notes for the authenticated user
router.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ owner: req.userId });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a specific note by ID for the authenticated user
router.get('/notes/:id', authenticate, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.userId });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new note for the authenticated user
router.post('/notes', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = new Note({ title, content, owner: req.userId });
    await newNote.save();

    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update an existing note by ID for the authenticated user
router.put('/notes/:id', authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { $set: { title, content } },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a note by ID for the authenticated user
router.delete('/notes/:id', authenticate, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, owner: req.userId });

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
