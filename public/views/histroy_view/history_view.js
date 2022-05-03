


import {hide, show, saveDataToLocalStorage, getDataFromLocalStorage, putUsername} from "../js/functions.js";
let showHistory = document.querySelector('#show-history')

let showUserName = document.querySelector(".user-name");
let getUserId = getDataFromLocalStorage("userId")

putUsername(getUserId, showUserName);


const showHistoryScores = (datas) =>{
    
    let controlScores = document.querySelector('#control-scores');
    controlScores.remove();

    let newControlScores = document.createElement('tbody');
    newControlScores.className ="text-white";
    showHistory.appendChild(newControlScores);
    newControlScores.id = 'control-scores';

    for (let data of datas) {
        let getUserId = getDataFromLocalStorage("userId");
        let userId = data.userId._id;
        if(getUserId == userId){
            let tr = document.createElement('tr');
            newControlScores.appendChild(tr);

            let tdUserName = document.createElement('td');
            tdUserName.textContent = data.quizId.title;
            tr.appendChild(tdUserName);

            let tdScore = document.createElement('td');
            tdScore.textContent = (data.scores* 100).toFixed()  + "%" ;
            tr.appendChild(tdScore);
        }
        
    }
}

axios.get("/scores/").then((response)=>{
    showHistoryScores(response.data);
});