/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require("express");
var app = express();
var jsonParser = require("body-parser").json;

// console.log("process.env.PORT", process.env.PORT);
var port = process.env.PORT || 3000;

app.use(jsonParser());

app.listen(port, function() {
  console.log("express server is listening on port", port);
});