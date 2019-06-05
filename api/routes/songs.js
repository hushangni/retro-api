const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");
const Song = require("../models/Song");

// @route   POST api/years/songs/add/:id
// @desc    Add new song to year
// @access  Private/Admin
router.post("/add/:id", auth, admin, (req, res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      res.send(err);
    }
    let newSong = new Song({
      title: req.body.title,
      artist: req.body.artist,
      year: year._id
    });
    newSong.save((err, song) => {
      if (err) {
        res.send(err);
      }
      year.songs.push(song);
      year.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Song saved." });
      });
    });
  });
});

module.exports = router;
