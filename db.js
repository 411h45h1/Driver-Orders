const { MongoClient } = require("mongodb");
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbCollection;

module.exports = {
  connectToServer: (callback) => {
    client.connect((err, db) => {
      if (db) {
        dbCollection = db.db("DriverOrders");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  database: () => dbCollection,
};
