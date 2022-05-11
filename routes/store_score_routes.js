const express = require('express')
const router = express.Router()

// import Task model
const scoreModel = require("../models/score_models");

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
});

// add to score to DB
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


// delete score when user deleted quizzes
router.delete("/deleteMany/:id", (req, res)=>{
    scoreModel.deleteMany({quizId: req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        
        res.send(error);
    });
  })


  router.get("/get/", (req, res)=>{
      scoreModel.find({quizId: "62748c1bce4fd1b799835c2e"})
      .then((result)=>{
          res.send(result);
      })
      .catch((error)=>{
          
          res.send(error);
      });
    })
  module.exports = router