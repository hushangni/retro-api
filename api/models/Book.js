const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year'
    }
});

module.exports = Book = mongoose.model("book", BookSchema);