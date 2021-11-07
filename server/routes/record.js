const express = require("express");

// recordRoutes is instance of express router
// Use it to define routes
// Router will be added as middleware & will take care of requests starting with path / record
const recordRoutes = express.Router();

// Helps connect to db
const dbo = require("../db/conn");

// Helps convert id from string to ObjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// Helps get a list of all records
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("movies");
    db_connect
        .collection("records")
        .find({}
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result)
        });

// Get single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect  
        .collection("records")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// Create a new record
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = db.getDb()
    let myobj = {
        movie_title: req.body.movie_title,
        movie_year: req.body.movie_year,
        movie_imdb: req.body.movie_imdb,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    }); 
});


// Update record by id
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newValues = {
        $set: {
            movie_title: req.body.movie_title,
            movie_year: req.body.movie_year,
            movie_imdb: req.body.movie_imdb,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myquery, newValues, function (err, res) {
            if (err) throw err;
            console.log("One document updated");
            response.json(res);
    });
});

// Delete a record
recordRoutes.route("/:id").delete(req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("One document deleted");
        response.status(obj);
    });
});

module.exports = recordRoutes;
