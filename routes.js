/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require('express');
var router = express.Router();
var Question = require("./models").Question;

router.param("qId", function (req, res, next, id) {
  Question.findById(id, function (err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }

    req.question = doc;
    return next();
  })
});

router.param("aId", function (req, res, next, id) {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error("Not Found");
    err.status = 404;
    return next(err);
  }
  next();
});

// GET /questions
// Return all the questions
router.get("/", function(req, res) {
  // -1 means Descending Order
  // "null" is to use third parameter as projection.
  Question.find({})
    .sort({createdAt: -1})
    .exec(function (err, questions) {
      if (err) return next(err);
      res.json(questions);
    });
  // res.json({response: "You sent me a GET request"});
});

// POST /questions
router.post("/", function(req, res, next) {
  var question = new Question(req.body);
  question.save(function (err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });
  // res.json({
  //   response: "You sent me a POST request",
  //   body: req.body
  // });
});

//GET /questions/:qId
router.get("/:qId", function(req, res) {
  res.json(req.question);
  // res.json({
  //   response: "You sent me a GET request for ID " + req.params.qId
  // });
});


// POST /questions/:qId/answers
// Route for creating an answer
router.post("/:qId/answers", function(req, res, next) {
  req.question.answers.push(req.body);
  req.question.save(function (err, question) {
    if (err) return next(err);
    res.status(201);
    res.json(question);
  });

  // res.json({
  //   response: "You sent me a POST request to /answers",
  //   questionId: req.params.qId,
  //   body: req.body
  // });
});

// PUT /questions/:qId/answers/:aId
// Edit a specific answer
router.put("/:qId/answers/:aId", function(req, res) {
  req.answer.update(req.body, function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
  // res.json({
  //   response: "You sent me a PUT request to /answers",
  //   questionId: req.params.qId,
  //   answerId: req.params.aId,
  //   body: req.body
  // });
});

// DELETE /questions/:qId/answers/:aId
// Delete a specific answer
router.delete("/:qId/answers/:aId", function(req, res) {
  req.answer.remove(function (err) {
    req.question.save(function (err, question) {
      if (err) return next(err);
      res.json(question);
    })
  });
  // res.json({
  //   response: "You sent me a DELETE request to /answers",
  //   questionId: req.params.qId,
  //   answerId: req.params.aId
  // });
});

// POST /questions/:qId/answers/:aId/vote-up
// POST /questions/:qId/answers/:aId/vote-down
// Vote on a specific answer
router.post("/:qId/answers/:aId/vote-:dir",
  function(req, res, next) {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  function(req, res) {
    req.answer.vote(req.vote, function (err, question) {
      if (err) return next(err);
      res.json(question);
    });
    // res.json({
    //   response: "You sent me a POST request to /vote-" + req.params.dir,
    //   questionId: req.params.qId,
    //   answerId: req.params.aId,
    //   vote: req.params.dir
    // });
  });

module.exports = router;