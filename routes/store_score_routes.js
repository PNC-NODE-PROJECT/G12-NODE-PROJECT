const express = require('express')
const router = express.Router()

// import Task model
const scoreModel = require("../models/score_models");
// const scoreModel = Data.score;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get score data from DB
router.get('/', (req, res)=>{
    scoreModel.find()
    .populate("quizId")
    .populate("userId")
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})

// add to Score
router.post('/addScore', (req, res)=>{
    let element =req.body;
    scoreModel.create(element)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    });
  })

module.exports = router