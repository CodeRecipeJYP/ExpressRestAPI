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

app.listen(port, function() {
  console.log("express server is listening on port", port);
});