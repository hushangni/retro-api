const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");
const Movie = require("../models/Movie");

// @route   POST api/years/movies/add/:id
// @desc    Add new movie to year
// @access  Private/Admin
router.post("/add/:id", auth, admin, (req, res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      res.send(err);
    }
    let newMovie = new Movie({
      title: req.body.title,
      year: year._id
    });
    newMovie.save((err, movie) => {
      if (err) {
        res.send(err);
      }
      year.movies.push(movie);
      year.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Movie saved." });
      });
    });
  });
});

module.exports = router;
