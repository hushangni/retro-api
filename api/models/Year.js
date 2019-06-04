const mongoose = require('mongoose');

const Book = require("./Book").schema;
const Song = require("./Song").schema;
const Show = require("./Show").schema;
const Movie = require("./Movie").schema;

const YearSchema = new mongoose.Schema({
    year: Number,
    decade: Number,
    movies: [Movie],
    songs: [Song],
    shows: [Show],
    books: [Book]
});

module.exports = Year = mongoose.model("year", YearSchema);