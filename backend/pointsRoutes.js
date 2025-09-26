const express = require('express');
const database = require('./connect');
const { ObjectId } = require('mongodb');

let pointsRoutes = express.Router();

// #1 - Retrieve All
pointsRoutes.route("/").get(async (req, res) => {
  try {
    let db = database.getDb();
    let data = await db.collection("points").find({}).toArray();
    res.json(data);
  } catch (error) {
    console.error("Error retrieving all points:", error);
    res.status(500).json({ error: error.message });
  }
});

// #2 - Retrieve One
pointsRoutes.route("/:id").get(async (req, res) => {
  try {
    let db = database.getDb();
    let data = await db.collection("points").findOne({ _id: new ObjectId(req.params.id) });

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Points transaction not found" });
    }
  } catch (error) {
    console.error("Error retrieving points transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

// #3 - Create One
pointsRoutes.route("/").post(async (req, res) => {
  try {
    let db = database.getDb();
    let newPoints = {
      req_id: req.body.req_id,
      user_id: req.body.user_id,
      trans_date: new Date(),
      type: req.body.type,
      points_earned: req.body.points_earned,
      points_spent: req.body.points_spent,
    };

    let result = await db.collection("points").insertOne(newPoints);
    res.json(result);
  } catch (error) {
    console.error("Error creating points transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

// #4 - Update One
pointsRoutes.route("/:id").put(async (req, res) => {
  try {
    let db = database.getDb();
    let updateObject = {
      $set: {
        req_id: req.body.req_id,
        user_id: req.body.user_id,
        trans_date: req.body.trans_date,
        type: req.body.type,
        points_earned: req.body.points_earned,
        points_spent: req.body.points_spent,
      },
    };

    let result = await db.collection("points").updateOne(
      { _id: new ObjectId(req.params.id) },
      updateObject
    );
    res.json(result);
  } catch (error) {
    console.error("Error updating points transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

// #5 - Delete One
pointsRoutes.route("/:id").delete(async (req, res) => {
  try {
    let db = database.getDb();
    let result = await db.collection("points").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    console.error("Error deleting points transaction:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = pointsRoutes;
