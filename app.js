/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

var jsonParser = require("body-parser").json;
var logger = require("morgan");


// console.log("process.env.PORT", process.env.PORT);
var port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

app.use("/questions", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log("Catch 404 function called??");
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
  // console.log("Error Handler function called??");
  // 500 : internal server error
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

app.listen(port, function() {
  console.log("express server is listening on port", port);
});