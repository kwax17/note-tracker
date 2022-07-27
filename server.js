// dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const { writeNote } = require("./lib/notes")

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
    let results = notes;
    if (req) {
        console.log(notes);
    };
    res.json(results);
});

// posting and saving note to data array // API ROUTE
app.post('/api/notes', (req, res) => {
    const note = writeNote(req.body, notes);
    res.json(note);
});

// gets the note html file // HTML ROUTE
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// gets the index page file // HTML ROUTE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// gets the index page for everything besides the notes request // HTML ROUTE
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get("/db", (req, res) => {
    let results = db;
    res.json(results);
});


// listening at port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});