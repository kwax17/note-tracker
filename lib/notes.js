const fs = require('fs');
const path = require('path');

function writeNote(body, notes) {
    const note = body;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notes}, null, 2)
    );
    return note;
}

module.exports = {
    writeNote
}