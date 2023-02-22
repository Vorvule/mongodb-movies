const express = require("express");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movie-routes");
const constants = require("./constants");

const PORT = constants.PORT;
const URL = constants.URL;

const app = express();
// middleware to read data from request
app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error: " + err));

app.listen(PORT, (error) => {
  error ? console.error(error) : console.log("Listening port " + PORT);
});
