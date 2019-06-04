const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year'
    }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);