// dependencies
const express = require('express');
const fs = require('fs');

// server
const PORT = process.env.PORT || 3002;
const app = express();
// data array
const { notes } = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware
app.use(express.static('public'));

// gets notes from array // API ROUTE
app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

// posting and saving note to data array // API ROUTE
app.post('/api/notes', (req, res) => {
    const note = req.body;
    fs.readFile('./db/db.json').then(function(data){
        notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
        fs.writeFile('./db/db.json', JSON.stringify(notes))
        res.json(notes);
    })
});

// gets the note html file // HTML ROUTE
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// gets the note html file // HTML ROUTE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// gets the note html file // HTML ROUTE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listening for port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});