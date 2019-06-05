const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");

// @route   GET api/years
// @desc    Return all years available
// @access  Private
router.get("/", auth, (req, res) => {
  Year.find().sort({year: 1}).then(years => res.json(years));
});

// @route   GET api/years/:decade
// @desc    Return all years in a certain decade
// @access  Private
router.get("/:decade", auth, (req, res) => {
  Year.find({ decade: req.params.decade }).then(years => res.json(years));
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

// @route   GET api/years/:id
// @desc    Return 1 specific year
// @access  Private
router.get("/:id", auth, (req, res) => {
  Year.findById(req.params.id, (err, year) => {
    if(err) {res.send(err)}

    res.json(year);
  })
})

// Define Routes
router.use("/movies", require("./movies"));
router.use("/songs", require("./songs"));
router.use("/shows", require("./shows"));
router.use("/books", require("./books"));

module.exports = router;
