const express = require('express')
const router = express.Router()


// import Task model
const questionModel = require("../models/question_models");
// const questionModel = Data.question;


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
        
    });
  })

// delete one question
router.delete("/delete/:id", (req, res)=>{
    questionModel.deleteOne({_id: req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        
        res.send(error);
    });
  })

// delete one question
router.delete("/deleteMany/:id", (req, res)=>{
    questionModel.deleteMany({quizzId: req.params.id})
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        
        res.send(error);
    });
  })

  // update
router.put("/updateQuestionData/:id", (req, res) => {
    let data = req.body
    questionModel.updateOne({_id: req.params.id},data)
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
  });

//   get question that have id of quiz from user request 
router.get('/getQuestionOfQuiz/:id', (req, res)=>{
    questionModel.find({quizzId: req.params.id})
    .then((result)=> {
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
  
    });
  })

module.exports = router


