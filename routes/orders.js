const orderRoutes = express.Router();
const db = require("../db.js");
const ObjectId = require("mongodb").ObjectId;

// get all orders
orderRoutes.route("/order").get((req, res) => {
  let db_connect = dbo.getDb("drivers");
  db_connect
    .collection("orders")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// get order by id
orderRoutes.route("/order/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("orders").findOne(myquery, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// create a new order
orderRoutes.route("/order/add").post((req, response) => {
  let db_connect = dbo.getDb();
  let { person_name, person_position, person_level } = req.body;

  let myobj = {
    person_name,
    person_position,
    person_level,
  };
  db_connect.collection("orders").insertOne(myobj, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// update an order by id
orderRoutes.route("/update/:id").post((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let { person_name, person_position, person_level } = req.body;
  let newvalues = {
    $set: {
      person_name,
      person_position,
      person_level,
    },
  };
  db_connect.collection("orders").updateOne(myquery, newvalues, (err, res) => {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
  });
});

// delete an order by id
orderRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("orders").deleteOne(myquery, (err, obj) => {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = orderRoutes;
