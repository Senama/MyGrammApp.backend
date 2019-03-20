// npm modules
const pgp = require ('pg promise')({});

// db modules
const db = pgp ('postgres://localhost/bits');

module.exports = db;


