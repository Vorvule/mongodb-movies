const mongoose = require("mongoose");

// constructor
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  genre: [String],
  rating: Number,
  dureation: {
    hours: Number,
    minutes: Number,
  },
  review: [{ name: String, text: String }],
});

// (Model name, model schema)
// Model name is singular form of its Collection:
// Movie <-> movies (collection)
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
