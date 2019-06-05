const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const Year = require("../models/Year");
const Book = require("../models/Book");

// @route   POST api/years/books/add/:id
// @desc    Add new book to year
// @access  Private/Admin
router.post("/add/:id", auth, admin, (req, res) => {
  Year.findById(req.params.id, (err, year) => {
    if (err) {
      res.send(err);
    }
    let newBook = new Book({
      title: req.body.title,
      artist: req.body.author,
      year: year._id
    });
    newBook.save((err, book) => {
      if (err) {
        res.send(err);
      }
      year.books.push(book);
      year.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Book saved." });
      });
    });
  });
});

module.exports = router;
