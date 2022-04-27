const express = require('express')
const fs = require('fs')
const router = express.Router()


// import Task model
const Data = require("../models/user_models");
const userModel = Data.user;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get user data from DB
router.get('/', (req, res)=>{
  userModel.find()
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})
// 

module.exports = router