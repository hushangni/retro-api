const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");
const Show = require("../models/Show");

// @route   POST api/years/shows/add/:id
// @desc    Add new show to year
// @access  Private/Admin
router.post("/add/:id", auth, admin, (req, res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      res.send(err);
    }
    let newShow = new Show({
      title: req.body.title,
      year: year._id
    });
    newShow.save((err, show) => {
      if (err) {
        res.send(err);
      }
      year.shows.push(show);
      year.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Show saved." });
      });
    });
  });
});

module.exports = router;
