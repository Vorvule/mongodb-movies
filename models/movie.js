const mongoose = require("mongoose");

// Model constructor
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

// Model name (Movie) is a singular of the collection name (movies)
// mongoose.model(name, schema)
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
