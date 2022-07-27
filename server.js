// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// server
const PORT = process.env.PORT || 3002;
const app = express();
// data array
const { notes } = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware
app.use(express.static('public'));

// gets the note html file // HTML ROUTE
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// gets the index page file // HTML ROUTE
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
// gets the index page for everything besides the notes request // HTML ROUTE
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// gets notes from array // API ROUTE
app.get('/api/notes', (req, res) => res.json(notes));

// posting and saving note to data array // API ROUTE
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // break down request
    const { title, text } = req.body;

    if (title && text) {
    const newNote = {
      title, 
      text
    };

    // Convert the data to a string so we can save it
    const reviewString = JSON.stringify(newNote);

    // Write the string to a file
    fs.writeFile(`./db/db.json`, reviewString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});


// listening at port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});