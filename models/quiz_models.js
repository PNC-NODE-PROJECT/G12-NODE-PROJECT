// ToDo
const mongoose = require("./database");

 
  
  //real data--------------------
const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userID:{
      type: mongoose.Types.ObjectId,
      ref: "users"

    }
});

  // Create the Model for the Tasks collection from Schema
  
  const quiz =  mongoose.model("quizzes",quizSchema);

  
 
  module.exports = quiz;
  