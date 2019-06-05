const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");

// @route   GET api/years
// @desc    Return all years available
// @access  Private
router.get("/", auth, (req, res) => {
  Year.find().then(years => res.json(years));
});

// @route   POST api/years
// @desc    Add new year
// @access  Private
router.post("/", auth, (req, res) => {
  const newYear = new Year({
    year: req.body.year,
    decade: req.body.decade,
    isAdmin: req.body.isAdmin,
    isVerified: req.body.isVerified
  });
  newYear.save().then(year => res.json(year));
});

// Define Routes
router.use("/movies", require("./movies"));
router.use("/songs", require("./songs"));
router.use("/shows", require("./shows"));
router.use("/books", require("./books"));

module.exports = router;
