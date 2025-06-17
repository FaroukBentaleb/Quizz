function loadOptions(i){
    if(!localStorage.getItem("score")){
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
        console.log(seg.question);
        document.getElementById("container").innerHTML = "<h2>" + seg.question + "</h2><span>" + i + "/10 Question</span>";
        let j=1;
        for(ans in seg.answers){
            document.getElementById("container").innerHTML +=
            `<label onclick='checkAnswer(` + j + `,this)'>
                <input type="radio" name="inventor" value="bell">
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
    });
}
document.getElementsByName("inventor").checked = function(){
    console.log("done");
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
        localStorage.setItem("score",localStorage.getItem("score")+1);
    }
    else{
        thiss.classList.add("incorrect");
    }
}
function Submit(){
    localStorage.setItem("score", );
    console.log("Submitted");
}
function Home(){
    window.location.href="../";
}