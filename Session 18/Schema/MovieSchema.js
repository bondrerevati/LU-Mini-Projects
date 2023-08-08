let mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const MoviesList = mongoose.model("movie", schema);
module.exports = MoviesList;
