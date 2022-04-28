const quiz = document.querySelector('#quiz');
const answerA = document.querySelector('#answer-A');
const answerB = document.querySelector('#answer-B');
const answerC = document.querySelector('#answer-C');
const answerD = document.querySelector('#answer-D');
const title_question = document.querySelector('.title-question');
const core = document.querySelector('.show-score');
const containQuestion = document.querySelector(".contain-question");

// Import function

// import {hide, show} from '../js/functions.js';

let quiz_datas = []
    // {
    //     question: "What is Preah Vihear Teample",
    //     answers: {
    //         choiceA: "Teample",
    //         choiceB: "District",
    //         choiceC: "Commune",
    //         choiceD: "Province"
    //     },
    //     correctAnswer: "A"
    // },

    // {
    //     question: "What is Preah CSS?",
    //     answers: {
    //         choiceA: "Teample",
    //         choiceB: "Cascading Style Sheets",
    //         choiceC: "Commune",
    //         choiceD: "Province"
    //     },
    //     correctAnswer: "B"
    // }
// ]
let currentQuestionIndex = 1;
let totalScore = 0;

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
    title_question.textContent = datas.question
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
    if (choice === quiz_datas[currentQuestionIndex-1].correctAnswer){
        totalScore += 1;
    }
    if(currentQuestionIndex < quiz_datas.length){
        showQuestion(quiz_datas[currentQuestionIndex]);
        currentQuestionIndex += 1;
    }else{
        hide(containQuestion);
        show(core);
        showScore(totalScore/quiz_datas.length);
    }
}

const getData = (data) => {
    
}

hide(containQuestion);
hide(core);

const showScore = (totalScore) => {
    let score = document.querySelector('.score');
    score.textContent = totalScore * 100 + '%';
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


const playQuiz = (e) => {
    e.preventDefault();
    let quizClass = e.target.className;
    let quizId = e.target.id;
    if(quizClass == "quiz-title"){
        hide(quiz);
        show(containQuestion)
        axios.get("/getQuestionOfQuiz/" + quizId)
        .then((response) => {
            console.log(response)
            quiz_datas  = response.data;
            showQuestion(quiz_datas[0]);
    })
    }
} 


quiz.addEventListener('click', playQuiz);
// const quizTitles = document.querySelector('.quiz-title');
// console.log(quizTitles)