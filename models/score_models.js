// ToDo
const mongoose = require("./database");
 
  
  //real data--------------------
const scoresSchema = new mongoose.Schema({
    scores: {
        type: Number,
    },
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: "quizzes"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});


  // Create the Model for the Tasks collection from Schema
  

  const score =  mongoose.model("scores",scoresSchema);
  
 
  module.exports = score;