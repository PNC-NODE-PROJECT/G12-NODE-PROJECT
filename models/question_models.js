// ToDo
const mongoose = require("./database");


//real data--------------------
const questionsSchema = new mongoose.Schema({
    question_title: {
        type: String,
    },
    answers: {
        choiceA: {
            type: String,

        },
        choiceB: {
            type: String,

        },
        choiceC: {
            type: String,

        },
        choiceD: {
            type: String,

        },
    },
    correctAnswer: {
        type: String,
    },
    quizzId: {
        type: mongoose.Types.ObjectId,
        ref: "quizzes"
    },
});

// Create the Model for the Tasks collection from Schema

const question = mongoose.model('questions', questionsSchema);

module.exports = question;