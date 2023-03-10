const express = require("express");

const {
  getMovie,
  getMovies,
  deleteMovie,
  addMovie,
  updateMovie,
} = require("../controllers/movie-controller");

const router = express.Router();

router.get("/movies/:id", getMovie);
router.get("/movies", getMovies);
router.delete("/movies/:id", deleteMovie);
router.post("/movies", addMovie);
router.patch("/movies/:id", updateMovie);

module.exports = router;
