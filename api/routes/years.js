const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");

// @route   GET api/years
// @desc    Return all years available
// @access  Private
router.get("/", auth, (req, res) => {
  if (req.query.sort === "asc") {
    Year.find().sort({ year: 1 }).then(years => res.json(years));
  } else if (req.query.sort === "desc") {
    Year.find().sort({ year: -1 }).then(years => res.json(years));
  } else {
    Year.find().then(years => res.json(years));
  }
});

// @route   GET api/years/decade
// @desc    Return all years in a certain decade
// @access  Private
router.get("/decade", auth, (req, res) => {
  if (req.query.sort === "asc") {
    Year.find({ decade: req.query.decade }).sort({ year: 1 }).then(years => res.json(years));
  } else if (req.query.sort === 'desc') {
    Year.find({ decade: req.query.decade }).sort({ year: -1 }).then(years => res.json(years));
  } else {
    Year.find({ decade: req.query.decade }).then(years => res.json(years));
  }
})

// @route   POST api/years
// @desc    Add new year
// @access  Private/Admin
router.post("/", auth, admin, (req, res) => {
  const newYear = new Year({
    year: req.body.year,
    decade: req.body.decade
  });
  newYear.save().then(year => res.json(year));
});

// @route   GET api/years/year
// @desc    Return 1 specific year
// @access  Private
router.get("/year", auth, (req, res) => {
  typeof(req.query.year)
  Year.find({ year: req.query.year })
    .then( year => res.json(year) )
    .catch( err => res.json(err) );
})

// Define Routes
router.use("/movies", require("./movies"));
router.use("/songs", require("./songs"));
router.use("/shows", require("./shows"));
router.use("/books", require("./books"));

module.exports = router;
