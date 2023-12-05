const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON in request bodies
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  // Read the db.json file and return saved notes as JSON
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  // Receive a new note in the request body
server.js 
 const newNote = req.body;

  // Add a unique id to the new note
  newNote.id = uuidv4();

  // Read existing notes from db.json
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

  // Add new note
  notes.push(newNote);

  // Write the updated notes array back to db.json
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes, null, 2), 'utf8');

  // Return the new note to the client
  res.json(newNote);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});