const express = require('express')
const fs = require('fs')
const router = express.Router()


// import Task model
const Data = require("../models/user_models");
const questionModel = Data.question;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get question data from DB
router.get('/', (req, res)=>{
    questionModel.find()
.populate("quiz_id")
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})

module.exports = router


