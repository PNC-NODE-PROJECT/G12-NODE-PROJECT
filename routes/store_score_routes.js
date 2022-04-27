const express = require('express')
const fs = require('fs')
const router = express.Router()

// import Task model
const Data = require("../models/user_models");
const scoreModel = Data.score;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get score data from DB
router.get('/', (req, res)=>{
    scoreModel.find()
    .populate("quiz_Id")
    .populate("user_Id")
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})

module.exports = router