const express = require('express')
const router = express.Router()


// import Task model
const questionModel = require("../models/question_models");
// const questionModel = Data.question;

// Define static route
// router.use(express.static("public"));

// TODO: Define dynamic routes
// Get question data from DB
router.get('/', (req, res)=>{
    questionModel.find()
.populate("quizzId")
  .then((result)=> {
      res.send(result);
  })
  .catch((error)=>{
      res.send(error);

  });
})
// add to user
router.post('/create', (req, res)=>{
    let element =req.body;
    questionModel.create(element)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    });
  })

// delete
router.delete("/delete/:id", (req, res)=>{
    questionModel.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
        res.send(error);
    });
  })

  // update
router.put("/update/:id", (req, res) => {
    let data = req.body
    console.log({_id: req.params.id},
      { question_title: req.body.question_title},
      { answers:{
          choiceA: req.body.answers.choiceA,
          choiceB: req.body.answers.choiceB,
          choiceC: req.body.answers.choiceC,
          choiceD: req.body.answers.choiceD
      }},
      { correctAnswer: req.body.correctAnswer},
      {quiz_id: req.body.quiz_id}
      )
      questionModel.updateOne({_id: req.params.id},data)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
        res.send(error);
    });
  });

//   get question that have id of quiz from user request 
router.get('/getQuestionOfQuiz/:id', (req, res)=>{
    questionModel.find({quizzId: req.params.id})
    .then((result)=> {
        console.log( req.params.id);
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
  
    });
  })

module.exports = router


