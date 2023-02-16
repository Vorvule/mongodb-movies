// NOT NEEDED AFTER MONGOOSE USAGE

const { MongoClient } = require("mongodb");

// See Compass left upper corner
const URL = "mongodb://localhost:27017/moviebox";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(URL)
      .then((client) => {
        console.log("Connected to DB");
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
