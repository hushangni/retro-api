const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: String,
    artist: String,
    year: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Year'
    }
});

module.exports = Song = mongoose.model("song", SongSchema);