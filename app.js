/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require("express");
var app = express();
var jsonParser = require("body-parser").json;

var jsonCheck = function(req, res, next) {
  if (req.body) {
    console.log("The sky is", req.body.color);
  } else {
    console.log("There is no body property on the request");
  }
  next();
};

// console.log("process.env.PORT", process.env.PORT);
var port = process.env.PORT || 3000;

app.use(jsonCheck);
app.use(jsonParser());
app.use(jsonCheck);

app.listen(port, function() {
  console.log("express server is listening on port", port);
});