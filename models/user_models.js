// ToDo
const mongoose = require("../data/datas.js");
 
  
  //real data--------------------
  const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
});
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
});
const questionsSchema = new mongoose.Schema({
    question_title: {
        type: String,
        required: true
    },
    answers: {
        choiceA: {
            value: String,
         
        },
        choiceB: {
            value: String,
          
        },
        choiceC: {
            value: String,
           
        },
        choiceD: {
            value: String,
           
        },
    },
    correctAnswer: {
        type: String,
    },
    quiz_Id: {
        type: mongoose.Types.ObjectId,
        ref: "quizzes"
    },
});
const scoresSchema = new mongoose.Schema({
    scores: {
        type: Number,
    },
    quiz_Id: {
        type: mongoose.Types.ObjectId,
        ref: "quizzes"
    },
    user_Id: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});


  // Create the Model for the Tasks collection from Schema
  
  const user = mongoose.model('users', usersSchema);
  const quiz =  mongoose.model("quizzes",quizSchema);
  const question = mongoose.model('questions', questionsSchema);
  const score =  mongoose.model("scores",scoresSchema);
  
 
  module.exports = {user,quiz,question,score};
