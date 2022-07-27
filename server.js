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

function findById(id, notesArray) {
  const result = notesArray.filter(note => note.id === id)[0];
  return result;
}

// gets the note html file // HTML ROUTE
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// gets the index page file // HTML ROUTE
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
// gets the index page for everything besides the notes request // HTML ROUTE
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// gets notes from array // API ROUTE
app.get('/api/notes', (req, res) => {
  let results = JSON.stringify(notes)
  if (req) {
    results = (req, results);
  }
  res.json(results);
});

app.get('api/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

// posting and saving note to data array // API ROUTE
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    req.body.id = notes.length.toString();

    // break down request
    const { title, text, id } = req.body;

    if (req.body) {
      const newNote = { title, text, id }
      // get info from file
      fs.readFile('./db/db.json', (err, notes)  => {
        if (err) throw err
        var notesArray = JSON.parse(notes)
        notesArray.notes.push(newNote)
        console.log(notesArray)

        // rewrite the file with updated data
        fs.writeFile(`./db/db.json`, JSON.stringify(notesArray), (err) => {
          if (err) {
            console.error(err)
          } else {
            path.join(__dirname, '../db/db.json')
            console.log(`Note for ${title} has been written to JSON file`)
          }
        });
      });

      const response = {
        status: 'success',
      };

      res.json(response);
  } else {
      res.json('Error in posting note');
  }
});


// listening at port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});