function loadData(){
    document.getElementById("football").innerHTML= "<li>No data found!</li>";
    document.getElementById("LOL").innerHTML= "<li>No data found!</li>";
    document.getElementById("IT").innerHTML= "<li>No data found!</li>";
    if(localStorage.getItem("History")){
        document.getElementById("football").innerHTML= "";
        document.getElementById("LOL").innerHTML= "";
        document.getElementById("IT").innerHTML= "";
        let history = JSON.parse(localStorage.getItem("History"));
        i=0;
        let ftb = 0;
        let lol = 0;
        let it = 0;
        for(let item in history){
            let option = history[item].Option;
            let Score = history[item].Score;
            let DateTime = new Date(history[item].Date)
            let date = DateTime.toDateString();
            switch(option){
                case "football":
                    document.getElementById("football").innerHTML+= `<li> Score: <span> ${Score} </span> | Date: <span> ${date} </span></li>`;
                    ftb++;
                    break;
                case "lol":
                    document.getElementById("LOL").innerHTML+= `<li> Score: <span> ${Score} </span> | Date: <span> ${date} </span></li>`;
                    lol++;
                    break;
                case "IT":
                    document.getElementById("IT").innerHTML+= `<li> Score: <span> ${Score} </span> | Date: <span> ${date} </span></li>`;
                    it++;
                    break;
            }
            console.log(option);
            i++;
        }
        if(ftb === 0){
            document.getElementById("football").innerHTML= "<li>No data found!</li>";
        }
        if(lol === 0){
            document.getElementById("LOL").innerHTML= "<li>No data found!</li>";
        }
        if(it === 0){
            document.getElementById("IT").innerHTML= "<li>No data found!</li>";
        }
    }
    else{
        console.log("nothing to show");
    }
}
function ClearHistory(){
    if(localStorage.getItem("History")){
        let conf_alert = confirm("Are you sure you want to clear your score history? (This action cannot be undone!!)");
        if(conf_alert){
            localStorage.removeItem("History");
            loadData();
        }
    }
    else{
        alert("Nothing to clear !!");
    }
}
function Home(){
    window.location.href="../";
}