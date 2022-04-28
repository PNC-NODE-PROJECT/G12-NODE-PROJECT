const express = require('express')
const router = express.Router()


// import Task model
const quizModel = require("../models/quiz_models");
// const quizModel = Data.quiz;

// Define static route
// router.use(express.static("public"));

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

// // add to user
// router.post('/addQuiz', (req, res)=>{
//     let element =req.body;
//     quizModel.create(element)
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((error)=>{
//         console.log(error);
//     });
//   })

// // delete
// router.delete("/deleteQuiz/:id", (req, res)=>{
//     quizModel.deleteOne({_id: req.params.id})
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((error)=>{
//         console.log(error);
//         res.send(error);
//     });
//   })


//   get question that have id of quiz from user request 
// router.get('/getUserOfQuiz/:id', (req, res)=>{
//     quizModel.find({userID :req.params.id})
//     .then((result)=> {
//         console.log(req.params.id);
//         console.log(result);
//         res.send(result);
//     })
//     .catch((error)=>{
//         res.send(error);
  
//     });
//   })

// module.exports = router