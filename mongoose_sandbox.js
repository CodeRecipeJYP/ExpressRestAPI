/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/sandbox",
  {
    useMongoClient: true
    /* other options */
  }
);

var db = mongoose.connection;

db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("db connection successful");
  // All database communication goes here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({});

  db.close();
});
