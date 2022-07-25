const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3002;
const app = express();

const { notes } = require('./db/db.json');

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});