const quiz = document.querySelector('#quiz');
const domShowQuiz = document.querySelector('#dom-show-quiz');
const answerA = document.querySelector('#answer-A');
const answerB = document.querySelector('#answer-B');
const answerC = document.querySelector('#answer-C');
const answerD = document.querySelector('#answer-D');
const title_question = document.querySelector('.title-question');
const domScore = document.querySelector('.show-score');
const containQuestion = document.querySelector(".contain-question");
const noData = document.querySelector('#no-data');
const goodBadAnswer = document.querySelector('#btn-good-bad-answer');
const domShowGoodBadAnswers = document.querySelector('#show-good-bad-answers')
const backFromShowcorrectAnswer = document.querySelector('#back-from-show-correction')
const btnCancel = document.querySelector('#cancel');
const btnPlayAgain = document.querySelector('#play-again');
const backFromNoquestion = document.querySelector('.back-from-noquestion');
let quizDatas = [];
let userChoosed = [];
let currentQuestionIndex = 1;
let totalScore = 0;
// import { hide, show } from "../js/functions.js";
const showQuiz = (datas) => {
    for(let data of datas) {
        let title = document.createElement('div');
        title.className = "quiz-title";
        title.id = data._id;
        title.textContent = data.title;
        quiz.appendChild(title);

    }
}

const showQuestion = (datas) => {
    title_question.textContent = datas.question_title
    answerA.textContent = datas.answers.choiceA;
    answerB.textContent = datas.answers.choiceB;
    answerC.textContent = datas.answers.choiceC;
    answerD.textContent = datas.answers.choiceD;
}

// Fucntion show elemet
const show = (element) => {
    element.style.display = 'block';
}

// Fucntion hide elemet
const hide = (element) => {
    element.style.display = 'none';
}

const clickAnswer = (choice) => {
    userChoosed.push(choice);
    if (choice === quizDatas[currentQuestionIndex-1].correctAnswer){
        totalScore += 1;
    }
    if(currentQuestionIndex < quizDatas.length){
        progressBar(currentQuestionIndex + "/" + quizDatas.length, currentQuestionIndex / quizDatas.length)
        showQuestion(quizDatas[currentQuestionIndex]);
        currentQuestionIndex += 1;
        
    }else{
        let indexQuestion = document.querySelector('.index-question');
        indexQuestion.textContent = "";
        indexQuestion.style.width =  "0%";
        hide(containQuestion);
        show(domScore);
        showScore(totalScore/quizDatas.length);
    }
    
}

const backToShowQuiz = () => {
    show(domShowQuiz);
    hide(domScore);
    currentQuestionIndex = 1;
    quizDatas = [];
    userChoosed = [];
    totalScore = 0;
    
}

const hideGoodBadAnswers = () => {
    backToShowQuiz();
    hide(domShowGoodBadAnswers);
}


const showScore = (totalScore) => {
    let score = document.querySelector('.score');
    score.textContent = (totalScore* 100).toFixed()  + '%';
}


// To display title of quizzes

const displayQuiz = () => {
    let path = "/quizzes";
    axios.get(path).then((response) => {
        let data = response.data;
        showQuiz(data);
    })
}

displayQuiz();

// To play quizzes when the user created
const playQuiz = (e) => {
    e.preventDefault();
    let quizClass = e.target.className;
    let quizId = e.target.id;
    if(quizClass == "quiz-title"){
        hide(domShowQuiz);
        axios.get("/questions/getQuestionOfQuiz/" + quizId)
        .then((response) => {
            if (response.data.length > 0){
                show(containQuestion)
                quizDatas  = response.data;
                showQuestion(quizDatas[0]);
            }else{
                show(noData)
            }
        })
    }
} 

const progressBar = (textContent, progressing) => {
    let indexQuestion = document.querySelector('.index-question');
    indexQuestion.textContent = textContent;
    indexQuestion.style.width = progressing*100 + "%";
}

const showGoodBadAnswers = () => {
    show(domShowGoodBadAnswers)
    hide(domScore)
    let correctAnswerIndex = 0;
    for (let questionData of quizDatas){
        let containOneQuestion = document.createElement('div');
        let titleQuestion = document.createElement('h3')
        let answer1 = document.createElement('p');
        let answer2 = document.createElement('p');
        let answer3 = document.createElement('p');
        let answer4 = document.createElement('p');

        containOneQuestion.className = 'bg-sm-none mb-4 p-lg-4 b-radius p-sm-1';
        titleQuestion.className = "p-2 border-bottom mb-4";
        answer1.className = "p-2 form-control";
        answer2.className = "p-2 form-control";
        answer3.className = "p-2 form-control";
        answer4.className = "p-2 form-control";
        
        titleQuestion.textContent = questionData.question_title;
        answer1.textContent = questionData.answers.choiceA;
        answer2.textContent = questionData.answers.choiceB;
        answer3.textContent = questionData.answers.choiceC;
        answer4.textContent = questionData.answers.choiceD;
        
        containOneQuestion.appendChild(titleQuestion)
        containOneQuestion.appendChild(answer1);
        containOneQuestion.appendChild(answer2);
        containOneQuestion.appendChild(answer3);
        containOneQuestion.appendChild(answer4);
        domShowGoodBadAnswers.appendChild(containOneQuestion);

        if(questionData.correctAnswer == "A"){
            answer1.classList.add("bg-correct") ;
        }else if(questionData.correctAnswer == "B"){
            answer2.classList.add("bg-correct") ;
        }else if(questionData.correctAnswer == "C"){
            answer3.classList.add("bg-correct") ;
        }else{
            answer4.classList.add("bg-correct") ;
        }

        if(questionData.correctAnswer != userChoosed[correctAnswerIndex]){
            if(userChoosed[correctAnswerIndex] == "A"){
                answer1.classList.add("bg-incorrect") ;
            }else if(userChoosed[correctAnswerIndex] == "B"){
                answer2.classList.add("bg-incorrect") ;
            }else if(userChoosed[correctAnswerIndex] == "C"){
                answer3.classList.add("bg-incorrect") ;
            }else{
                answer4.classList.add("bg-incorrect") ;
            }
        }
        correctAnswerIndex += 1;
    }
}

// Hide pages nesessery 
hide(domShowGoodBadAnswers);
hide(noData);
hide(containQuestion);
hide(domScore);


// Add buttons for click
quiz.addEventListener('click', playQuiz);
goodBadAnswer.addEventListener('click', showGoodBadAnswers);
btnCancel.addEventListener('click', backToShowQuiz);
backFromShowcorrectAnswer.addEventListener('click', hideGoodBadAnswers);
backFromNoquestion.addEventListener('click', (event) =>{
    hide(noData);
    show(domShowQuiz);
});