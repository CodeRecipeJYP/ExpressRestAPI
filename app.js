/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require("express");
var app = express();

// console.log("process.env.PORT", process.env.PORT);
var port = process.env.PORT || 3000;


app.use(function(req, res, next) {
  console.log("First piece of middleware");
  next();
});

app.use(function(req, res, next) {
  console.log("Second piece of middleware");
  next();
});

app.listen(port, function() {
  console.log("express server is listening on port", port);
});