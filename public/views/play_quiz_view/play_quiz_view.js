const quiz = document.querySelector('#quiz');
const answerA = document.querySelector('#answer-A');
const answerB = document.querySelector('#answer-B');
const answerC = document.querySelector('#answer-C');
const answerD = document.querySelector('#answer-D');
const title_question = document.querySelector('.title-question');
const core = document.querySelector('.show-score');
const containQuestion = document.querySelector(".contain-question");
const noData = document.querySelector('#no-data');
const goodBadAnswer = document.querySelector('#good-bad-answer');

let quizDatas = [];
let userChoosed = [];
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
    console.log(userChoosed);
    if (choice === quizDatas[currentQuestionIndex-1].correctAnswer){
        totalScore += 1;
    }
    if(currentQuestionIndex < quizDatas.length){
        showQuestion(quizDatas[currentQuestionIndex]);
        currentQuestionIndex += 1;
        
    }else{
        hide(containQuestion);
        show(core);
        showScore(totalScore/quizDatas.length);
    }
    
}


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

// To play quizzes when the user created
const playQuiz = (e) => {
    e.preventDefault();
    let quizClass = e.target.className;
    let quizId = e.target.id;
    if(quizClass == "quiz-title"){
        hide(quiz);
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


















hide(noData)
hide(containQuestion);
hide(core);
quiz.addEventListener('click', playQuiz);
goodBadAnswer.addEventListener('click', showGoodBadAnswers);