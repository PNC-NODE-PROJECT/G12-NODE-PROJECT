const express = require('express')
const fs = require('fs')
const router = express.Router()


// import Task model
const Data = require("../models/user_models");
const quizModel = Data.quiz;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get quiz data from DB
router.get('/', (req, res)=>{
    quizModel.find()
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})

module.exports = router