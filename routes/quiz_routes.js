const express = require('express')
const router = express.Router()


// import Task model
const quizModel = require("../models/quiz_models");


// TODO: Define dynamic routes
// Get quiz data from DB
router.get('/', (req, res)=>{
    quizModel.find()
    .populate("userID")
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})

// users create quizzes
router.post('/addQuiz', (req, res)=>{
    let element =req.body;
    quizModel.create(element)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    });
  })

// delete
router.delete("/deleteQuiz/:id", (req, res)=>{
    quizModel.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
  })


//   get question that have id of quiz from user request 
router.get('/getUserOfQuiz/:id', (req, res)=>{
    quizModel.find({userID :req.params.id})
    .then((result)=> {
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
  
    });
})


router.put("/update/:id", (req, res) => {
    let data = req.body
    quizModel.updateOne({_id: req.params.id},data)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
  });




module.exports = router