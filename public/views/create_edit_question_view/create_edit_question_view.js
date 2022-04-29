const URL = "http://localhost:80"
let title = document.querySelector("#title");
let anA = document.querySelector("#choiceA");
let anB = document.querySelector("#choiceB");
let anC = document.querySelector("#choiceC");
let anD = document.querySelector("#choiceD");
// Check correct answers
let correctA = document.getElementById("correctA");
console.log(correctA);
let correctB = document.getElementById("correctB")
let correctC = document.getElementById("correctC")
let correctD = document.getElementById("correctD")

const hide = (element) => {
    element.style.display = 'none';
}
const show = (element) => {
    element.style.display = 'block';
}

function displayQuestion() {
    axios.get(URL + "/questions").then((respone) => {
        let questions = respone.data;
        // console.log(questions[0].answers.choiceA);
        for (let question of questions) {

            let card = document.createElement("div");
            card.id = question._id;
            card.className = "mt-3 show-question-answers"
            let titleQuestion = document.createElement("h4");
            titleQuestion.className = "title";
            titleQuestion.textContent = question.question_title;

            let answers = document.createElement("div");
            answers.className = "answers";

            let answerA = document.createElement('p');
            answerA.className = "answerDisplay";
            answerA.textContent = question.answers.choiceA;
            console.log(answerA);

            let answerB = document.createElement('p');
            answerB.className = "answerDisplay";
            answerB.textContent = question.answers.choiceB;

            let answerC = document.createElement('p');
            answerC.className = "answerDisplay";
            answerC.textContent = question.answers.choiceC;

            let answerD = document.createElement('p');
            answerD.className = "answerDisplay";
            answerD.textContent = question.answers.choiceD;


            let correctAn = document.createElement('p');
            correctAn.textContent = question.correctAnswer;
            let hr = document.createElement('hr')
            if (question.correctAnswer == "A") {
                answerA.style.backgroundColor = "green";
            } else if (question.correctAnswer == "B") {
                answerB.style.backgroundColor = "green"
            } else if (question.correctAnswer == "C") {
                answerC.style.backgroundColor = "green"
            } else if (question.correctAnswer == "D") {
                answerD.style.backgroundColor = "green"
            }
            let editQuestion = document.createElement('i');
            editQuestion.src = "../../public/images/edit.png";
            // editAction.addEventListener("click", editQuestion);
            editQuestion.className = "material-icons edit";
            editQuestion.style = "font-size:30px;color:white";
            editQuestion.textContent = "mode_edit";


            let deleteQuestion = document.createElement('i');
            // deleteQuestion.src = "../../public/images/trash.png";
            // trashAction.addEventListener("click", removeQuestion);
            deleteQuestion.className = "material-icons delete";
            deleteQuestion.style = "font-size:30px;color:white";
            deleteQuestion.textContent = "delete";

            card.appendChild(titleQuestion);
            answers.appendChild(answerA);
            answers.appendChild(answerB);
            answers.appendChild(answerC);
            answers.appendChild(answerD);
            card.appendChild(answers);
            card.appendChild(hr);
            card.appendChild(editQuestion);
            card.appendChild(deleteQuestion);

            screenToDisplay.appendChild(card);
        }

    })
}

// Create answers & question
function createQuestion() {
    // Check correct answers
    let correctAn = '';
    if (correctA.checked) {
        correctAn = "A";
    } else if (correctB.checked) {
        correctAn = "B";
    } else if (correctC.checked) {
        correctAn = "C";
    } else if (correctD.checked) {
        correctAn = "D";
    }
    let body = {
        question_title: title.value,
        answers: {
            choiceA: anA.value,
            choiceB: anB.value,
            choiceC: anC.value,
            choiceD: anD.value,

        },
        correctAnswer: correctAn
    }
    axios.post(URL + "/questions/create", body).then((respone) => {
        show(screenToDisplay)
        displayQuestion();
    })
}

const btnCreate = document.querySelector('#create');
const screenToDisplay = document.querySelector(".displayQuestion");
axios.get(URL + "/questions").then((respone) => {
    console.log(respone.data)
    if (respone.data.length <= 0) {
        hide(screenToDisplay)
    } else {
        displayQuestion()
    }
})

btnCreate.addEventListener('click', createQuestion);