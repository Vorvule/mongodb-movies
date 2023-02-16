const express = require("express");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie-routes");

const PORT = 3000;
// const URL = "mongodb://localhost:27017/moviebox";
const URL =
  "mongodb+srv://7105690:cY5XJpHmUQJT1Qtk@cluster0.vn2glgq.mongodb.net/moviebox?retryWrites=true&w=majority";

const app = express();
// middleware to read data from request
app.use(express.json());
app.use(movieRoutes);

mongoose
  // .connect(URL)
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error: " + err));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening port " + PORT);
});
