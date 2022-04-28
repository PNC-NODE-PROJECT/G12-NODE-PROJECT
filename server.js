// To Do
// create server

require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

var cors = require("cors");
app.use(express.urlencoded({ extended : true }));
app.use(express.json())

app.use(cors({origin:'*'}));
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log('Server is running.....   ' +"http://localhost:"+ PORT)
})

// call file from folder routes
let usersRouter = require('./routes/user_routes'); //call usersRouter
let quizzRouter = require('./routes/quiz_routes'); //call quizRouter
let questionRouter = require('./routes/question_routes'); //call questionRouter
let scoreRouter = require('./routes/store_score_routes'); //call scoreRouter


//use other file what we call from router folder
app.use('/users', usersRouter) //use userRouter
app.use('/quizzes', quizzRouter) //use quizRouter
app.use('/questions', questionRouter) //use questionRouter
app.use('/scores', scoreRouter) //use scoreRouter


