/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require('express');
var router = express.Router();


// GET /questions
router.get("/", function(req, res) {
  // Return all the questions
  res.json({response: "You sent me a GET request"});
});

// POST /questions
router.post("/", function(req, res) {
  // Return all the questions
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

//GET /questions/:id
router.get("/:id", function(req, res) {
  // Return all the questions
  res.json({
    response: "You sent me a GET request for ID " + req.params.id
  });
});

module.exports = router;