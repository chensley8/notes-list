
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/db.json');

router.get('/', (req, res) => {
  const notes = loadNotes();
  res.json(notes);
});

router.post('/', (req, res) => {
  const notes = loadNotes();
  const { title, content } = req.body;
  const newNote = { title, content, createdAt: new Date() };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
});


function loadNotes() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function saveNotes(notes) {
  const data = JSON.stringify(notes, null, 2);
  fs.writeFileSync(dbPath, data, 'utf-8');
}

module.exports = router;
