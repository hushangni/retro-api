const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  title: String,
  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Year'
  }
});

module.exports = Show = mongoose.model("show", ShowSchema);
