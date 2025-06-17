function loadOptions(i){
    if(i === 1){
        localStorage.setItem("score",0);
    }
    fetch('../Quizz.json')
    .then((response) => response.json())
    .then((json) => {
        let data;
        switch(localStorage.getItem("opt")){
            case "football":{
                data = json.football;
                break;
            }
            case "IT":{
                data = json.IT;
                break;
            }
            case "lol":{
                data = json.lol;
                break;
            }
        }
        const seg = data["Q"+i];
        document.getElementById("container").innerHTML = "<h2>" + seg.question + "</h2><span>" + i + "/10 Question</span>";
        let j=1;
        for(let ans in seg.answers){
            document.getElementById("container").innerHTML +=
            `<label>
                <input type="radio" name="inventor" value="bell" onclick='checkAnswer(${j},this.parentElement)'>
                <span class="truncate">` + seg.answers[ans] + `</span>
            </label>`;
            j++;
        }
        localStorage.setItem("correct", seg.correct);
        if(i<10){   
            document.getElementById("container").innerHTML+= "<button id='next-btn' class='disable' onclick='loadOptions(" + Number(i+1) + ")' disabled>Next</button>"; 

        }
        else{
            document.getElementById("container").innerHTML+= "<button id='submit-btn' onclick='Submit()' class='disable' disabled>Submit</button>";  
        }
        document.getElementById("container").innerHTML+= "<button onclick='Home()'>Back Home</button>";
        scoreDisplay(Number(localStorage.getItem('score'))*100/10);
    });
}
function checkAnswer(index,thiss){
    if(document.getElementById("next-btn")){
        document.getElementById("next-btn").classList.remove("disable");
        document.getElementById("next-btn").setAttribute("style","cursor:pointer;");
        document.getElementById("next-btn").disabled = false;
    }
    
    if(document.getElementById("submit-btn")){
        document.getElementById("submit-btn").classList.remove("disable");
        document.getElementById("submit-btn").setAttribute("style","cursor:pointer;");
        document.getElementById("submit-btn").disabled = false;
    }
    if(Number(localStorage.getItem("correct")) === Number(index)){
        thiss.classList.add("correct");
        localStorage.setItem("score",String(Number(localStorage.getItem("score"))+1));
    }
    else{   
        thiss.classList.add("incorrect");
    }
}
function Submit(){
    if(!localStorage.getItem("History")){
        localStorage.setItem("History",JSON.stringify([]));
    }
    let JSONData = `{"Option" : "${localStorage.getItem("opt")}", "Date" : "${new Date()}", "Score" : "${localStorage.getItem("score")}"}`;
    let item = JSON.parse(JSONData);
    let history = JSON.parse(localStorage.getItem("History"));
    history.push(item);
    localStorage.setItem("History",JSON.stringify(history));
    Home();
}
function Home(){
    window.location.href="../";
}



function scoreDisplay(ratingScore){
    const ratings = document.querySelectorAll(".rating");
    ratings.forEach((rating) => {
    const ratingContent = rating.innerHTML;
    const scoreClass =
        ratingScore < 40 ? "bad" : ratingScore < 60 ? "meh" : "good";
    if(rating.classList.contains("bad")){
        rating.classList.remove("bad");
    }
    if(rating.classList.contains("meh")){
        rating.classList.remove("meh");
    }
    if(rating.classList.contains("good")){
        rating.classList.remove("good");
    }
    rating.classList.add(scoreClass);
    console.log(rating.classList);
    const ratingColor = window.getComputedStyle(rating).backgroundColor;
    const gradient = `background: conic-gradient(${ratingColor} ${ratingScore}%, transparent 0 100%)`;
    rating.setAttribute("backgroundImage", gradient);
    
    rating.innerHTML = `<span   >${ratingScore} ${
        ratingContent.indexOf("%") >= 0 ? "<small>%</small>" : ""
    }</span>`;
    });

}
