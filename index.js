function start(index){
    let page = "";
    switch(index){
        case 1:
            page = "football";
            break;
        case 2:
            page = "lol";
            break;
        case 3:
            page = "IT";
            break;
    }
    localStorage.setItem("opt",page);
    window.location.href= "TakeQuiz";
}
function scoreBoard(){
    window.location.href= "ScoreBoard";
}