const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

const PORT = 3000;

const app = express();
// middleware to read data from request
app.use(express.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, (err) => {
      err ? console.log(err) : console.log("Listening port " + PORT);
    });

    db = getDb();
  } else {
    console.log("DB connection error: " + err);
  }
});

// ROUTES

// route to fetch data
app.get("/movies", (req, res) => {
  const movies = [];

  // returns cursor with hasNext, next, forEach etc methods
  // batch = 101; split in 20...50 items
  // Verify - GET
  // http://localhost:3000/movies
  db.collection("movies")
    .find()
    .sort({ title: 1 })
    .forEach((movie) => {
      movies.push(movie);
    })
    .then(() => {
      res.status(200).json(movies);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

const handleError = (res, error) => {
  res.status(500).json({ error });
};

// :id - dynamic value
app.get("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      // req.params.id - the value is taken from the request, see browser address
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => handleError(res, "Something goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});

app.delete("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => handleError(res, "Something goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});

// add new item
app.post("/movies", (req, res) => {
  db.collection("movies")
    .insertOne(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch("/movies/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("movies")
      .updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => handleError(res, "Something goes wrong..."));
  } else {
    handleError(res, "Wrong id");
  }
});
