// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
var uniqid = require('uniqid');

// server
const PORT = process.env.PORT || 3002;
const app = express();
// data 
const {notes} = require('./db/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware
app.use(express.static('public'));

// gets notes from array // API ROUTE
app.get('/api/notes', (req, res) => { 
  res.json(notes)
});

// posting and saving note to data array // API ROUTE
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  req.body.id = uniqid();

  // break down request
  const { title, text, id } = req.body;

  if (req.body) {
    const newNote = { title, text, id }
    notes.push(newNote)
    console.log(notes)

    // rewrite the file with updated data
    fs.writeFileSync(`./db/db.json`, JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err)
      } else {
        path.join(__dirname, '../db/db.json')
        console.log(`Note for ${title} has been written to JSON file`)
      }
    });
    res.json(newNote);
} else {
    res.json('Error in posting note');
}
});

// gets the note html file // HTML ROUTE
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
// gets the index page file // HTML ROUTE
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
// gets the index page for everything besides the notes request // HTML ROUTE
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

// listening at port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});