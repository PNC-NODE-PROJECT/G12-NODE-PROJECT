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
const containGoodBadAnswers = document.querySelector('#contain-good-bad-answers')
const backFromShowcorrectAnswer = document.querySelector('#back-from-show-correction')
const btnCancel = document.querySelector('#cancel');
const btnPlayAgain = document.querySelector('#play-again');
const backFromNoquestion = document.querySelector('.back-from-noquestion');
const domShowMyQuiz = document.querySelector("#dom-my-quiz");
const containQuizzes = document.querySelector(".contain-quizzes");
const showEditQuiz = document.querySelector(".show-edit-quiz");


// Search 
const searchInput = document.querySelector('.search');
searchInput.addEventListener('keyup', function(e) {
    let text = searchInput.value.toLowerCase();
    let items = document.querySelectorAll('.quiz-title')
    for(let item of items){
        let title = item.textContent.toLowerCase();
        if(title.indexOf(text)===-1){
            hide(item.parentNode);
        }else {
            show(item.parentNode);
        }
    }
})


// Local storage
const saveDataToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}
const getDataFromLocalStorage = (key) => {
    let data = localStorage.getItem(key);
    return data
}

// To show user name 
let showUserName = document.querySelector(".user-name");
let getUserId = getDataFromLocalStorage("userId")
axios.get("/users/user/" + getUserId).then((response) => {
    showUserName.textContent = response.data[0].username;
})

let quizDatas = [];
let userChoosed = [];
let currentQuestionIndex = 1;
let totalScore = 0;
const showQuiz = (datas) => {
    let domQuiz = document.querySelector('#quiz');
    domQuiz.remove();
    let newDomQuiz = document.createElement('div');
    domShowQuiz.appendChild(newDomQuiz);
    newDomQuiz.id = "quiz";
    for(let data of datas) {
        let containTitle = document.createElement('div');
        containTitle.className = "control-one-quiz"
        let title = document.createElement('div');
        containTitle.appendChild(title);
        title.className = "quiz-title";
        title.id = data._id;
        title.textContent = data.title;
        newDomQuiz.appendChild(containTitle);
    }
}

// Show my questions
const displayMyQuiz = () => {
    let path = "/quizzes/getUserOfQuiz/";
    let userId = getDataFromLocalStorage("userId")
    axios.get(path+userId).then((response) => {
        hide(domShowQuiz)
        show(domShowMyQuiz)
        let data = response.data;
        showMyQuiz(data);
        
    })
}

// My quizzes
const btnBackToAllQuiz = document.querySelector(".btn-back-to-all-quiz")
const myQuiz = document.querySelector('#myquiz');
const btnShowMyQuiz = document.querySelector('.btn-find-quiz');

btnBackToAllQuiz.addEventListener('click', () =>{
    hide(domShowMyQuiz);
    show(domShowQuiz);
    displayQuiz();
});

btnShowMyQuiz.addEventListener("click", displayMyQuiz);

const showMyQuiz = (datas) => {
    let myQuiz = document.querySelector('#myquiz');
    myQuiz.remove();
    let divMyquestion = document.createElement('div');
    domShowMyQuiz.appendChild(divMyquestion);
    divMyquestion.id = "myquiz";
    for(let data of datas) {
        let controlMyQuestion = document.createElement('div');
        controlMyQuestion.className = "control-one-quiz"
        divMyquestion.appendChild(controlMyQuestion);

        let title = document.createElement('div');
        title.className = "quiz-title";
        title.id = data._id;
        title.textContent = data.title;
        controlMyQuestion.appendChild(title);

        let controlBtn = document.createElement('div');
        controlBtn.className = "d-flex btn-myquiz";
        let btnDelete = document.createElement('button');
        let btnEdit = document.createElement('button');

        btnDelete.className = "delete-quiz";
        btnDelete.textContent = 'Delete';
    
        btnEdit.className = "edit-quiz";
        btnEdit.textContent = 'Edit';
        
        controlBtn.appendChild(btnDelete);
        controlBtn.appendChild(btnEdit);
        controlMyQuestion.appendChild(controlBtn);

    }
    domShowMyQuiz.addEventListener('click', playQuiz);
    divMyquestion.addEventListener('click', deleteAndEditQuiz);
}


const showQuestion = (datas) => {
    title_question.textContent = datas.question_title;
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
        let socre = totalScore/quizDatas.length
        indexQuestion.textContent = "";
        indexQuestion.style.width =  "0%";
        hide(containQuestion);
        show(domScore);
        saveScore(socre);
        showScore(socre);
    }
    
}

const saveScore = (score) => {
    let scoreData = {
        scores: score,
        userId : getDataFromLocalStorage("userId"),
        quizId: getDataFromLocalStorage("quizId")
    }
    axios.post('/scores/addScore/', scoreData)
    localStorage.removeItem('quizId')

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
    hide(containGoodBadAnswers);
}


const showScore = (totalScore) => {
    let score = document.querySelector('.score');
    let totalScores = (totalScore * 100).toFixed()   + '%';
    score.textContent = totalScores;

   
    let getUserId = getDataFromLocalStorage("userId")
    axios.get("/users/user/" + getUserId).then((response) => {
        let email = {
            "from": "raths8546@gmail.com",
            "to": response.data[0].email,
             "subject": "scores",
              "content": "Your scores is:" + totalScores + "http://192.168.173.29:80/views/play_quiz_view/play_quiz_view.html"
            }
            axios.post('/email/Email', email)
        
    })
    
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
                saveDataToLocalStorage("quizId", quizId);
                show(containQuestion)
                hide(domShowMyQuiz)
                quizDatas  = response.data;
                showQuestion(quizDatas[0]);
            }else{
                hide(domShowMyQuiz)
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
    show(containGoodBadAnswers)
    hide(domScore)
    let domShowGoodBadAnswers = document.querySelector("#show-good-bad-answers");
    domShowGoodBadAnswers.remove();
    let newDomShowGoodBadAnswers = document.createElement('div');
    containGoodBadAnswers.appendChild(newDomShowGoodBadAnswers);
    newDomShowGoodBadAnswers.id = 'show-good-bad-answers'

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
        newDomShowGoodBadAnswers.appendChild(containOneQuestion);

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






function getPDF() {
    var doc = new jsPDF();
    doc.text(80, 20, 'Thank you!')
 
    var elementHandler = {
    '#show-score': function (element, renderer) {
        return true;
    }
   
    };
    var source = window.document.getElementById("show-score");   ;

    doc.fromHTML(
        source,
        10,
        40,
        {
        'width': 111,'elementHandlers': elementHandler
        });
    doc.text(45, 125, 'This is client-side Javascript, pumping out a PDF.');

    
    doc.save('Test.pdf');

    
}


// Fucntion check to delete and edit quiz
const deleteAndEditQuiz = (e) => {
    e.preventDefault() 
    let checkClass = e.target.className
    let titleQuiz =  e.target.parentNode.parentNode.firstChild.textContent;
    console.log(titleQuiz)
    let quizId = e.target.parentNode.parentNode.firstChild.id;
    if (checkClass == "delete-quiz"){
        deleteQuiz(quizId) ;
    }else if (checkClass == "edit-quiz"){
        hide(domShowMyQuiz);
        show(showEditQuiz);
        document.querySelector("#title-question").value = titleQuiz;
        let btnEditQuiz = document.querySelector(".btn-edit-quiz");
        btnEditQuiz.id = quizId;
        btnEditQuiz.addEventListener("click", editQuiz)
    }
}


const deleteQuiz = (quizId) => {
    axios.delete("/quizzes/deleteQuiz/"+quizId)
    .then(() => {
        displayMyQuiz()
    })
    .catch(err => {
        console.log(err)
    })
}

const editQuiz = () => {
    let titleQuestion = document.querySelector("#title-question").value;
    let idToEdite = document.querySelector(".btn-edit-quiz").id;
    let dataToEdit = {title: titleQuestion}
    axios.put("/quizzes/update/"+ idToEdite, dataToEdit)
    .then(() => {
        hide(showEditQuiz);
        displayMyQuiz();
    })
    .catch(err => {
        console.log(err)
    })
}








// Hide pages unnesessery 
hide(containGoodBadAnswers);
hide(noData);
hide(containQuestion);
hide(domScore);
hide(domShowMyQuiz);
hide(showEditQuiz)
// Add buttons for click
domShowQuiz.addEventListener('click', playQuiz);
goodBadAnswer.addEventListener('click', showGoodBadAnswers);
btnCancel.addEventListener('click', backToShowQuiz);
backFromShowcorrectAnswer.addEventListener('click', hideGoodBadAnswers);
backFromNoquestion.addEventListener('click', (event) =>{
    hide(noData);
    show(domShowQuiz);
});
btnPlayAgain.addEventListener('click', getPDF);

