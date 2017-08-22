/**
 * Created by jaeyoung on 8/22/17.
 */
'use strict';

var express = require('express');
var router = express.Router();


// GET /questions
// Return all the questions
router.get("/", function(req, res) {
  res.json({response: "You sent me a GET request"});
});

// POST /questions
router.post("/", function(req, res) {
  res.json({
    response: "You sent me a POST request",
    body: req.body
  });
});

//GET /questions/:qId
router.get("/:qId", function(req, res) {
  res.json({
    response: "You sent me a GET request for ID " + req.params.qId
  });
});


// POST /questions/:qId/answers
// Route for creating an answer
router.post("/:qId/answers", function(req, res) {
  res.json({
    response: "You sent me a POST request to /answers",
    questionId: req.params.qId,
    body: req.body
  });
});

// PUT /questions/:qId/answers/:aId
// Edit a specific answer
router.put("/:qId/answers/:aId", function(req, res) {
  res.json({
    response: "You sent me a PUT request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId,
    body: req.body
  });
});

// DELETE /questions/:qId/answers/:aId
// Delete a specific answer
router.delete("/:qId/answers/:aId", function(req, res) {
  res.json({
    response: "You sent me a DELETE request to /answers",
    questionId: req.params.qId,
    answerId: req.params.aId
  });
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
      next();
    }
  },
  function(req, res) {
  // function(req, res, next) {
    res.json({
      response: "You sent me a POST request to /vote-" + req.params.dir,
      questionId: req.params.qId,
      answerId: req.params.aId,
      vote: req.params.dir
    });
    next();
    // app.js에서 app.use("/questions", routes); router.post에 걸린 후에는
    // next()호출해도 app.js 아래에있는 middleware 호출 안하나봄.
    // 그리고 Error핸들링은 next(err)를 호출한 경우에만 하는가봄
    // -> 알고보니 function(req, res, next)의 형태가 아니라서 next가 없었음
    // 그럼 무슨 next를 호출한거지?
    // -> 위의 입력 인자에 next추가하고 실행하니 catch 404 호출됨
    // -> 정상적으로 next호출하면 아래의 middleware까지 호출되나봄
  });

module.exports = router;