// To Do
// create server
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json())
const { v4: uuidv4 } = require('uuid');

app.listen(PORT, () => {
    console.log('Server is running.....   ' +"http://localhost:"+ PORT)
})

// call file from folder routes
let usersRouter = require('./routes/user_routes'); //call usersRouter
// let quizzRouter = require('./routes/quiz_routes.js'); //call quizRouter
// let questionRouter = require('./routes/user_routes.js'); //call questionRouter
// let scoreRouter = require('./routes/store_score_routes.js'); //call scoreRouter


//use other file what we call from router folder
app.use('/getUser', usersRouter) //use userRouter
// app.use('/', quizzRouter) //use quizRouter
// app.use('/', questionRouter) //use questionRouter
// app.use('/', scoreRouter) //use scoreRouter