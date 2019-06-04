const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Year = require("../models/Year");

// @route   GET api/years
// @desc    Return all years available
// @access  Private
router.get("/", auth, (req, res) => {
  return res.send("Receiving shit in api/users here.");
});

module.exports = router;
