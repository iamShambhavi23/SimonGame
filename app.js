let gameSeq=[];
let userSeq=[];
let score=[];
let btns=["red","yellow","green","blue"];

let started=false;
let level=0;

h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        started=true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },300);
}
function userFlash(btn){
    //console.log("user flash");
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    console.log(`gameseq = ${gameSeq}`);
    gameFlash(randBtn);
}   
function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        if(score.length==0){
            h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Your highest score is <b>${level}</b><br>Press any key to start`;
        }
        else{
            let maxScore=score.reduce((max,ele)=>{
                if(ele>max)
                return ele;
                else
                return max;
            });
            if(maxScore>level)
                h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Your highest score is <b>${maxScore}</b><br>Press any key to start`;
            else
            h2.innerHTML=`Game Over! Your score was <b>${level}</b><br>Your highest score is <b>${level}</b><br>Press any key to start`;
        }
        document.querySelector(".heading").style.backgroundColor="red";
        document.querySelector(".btn-container").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector(".heading").style.backgroundColor="lightgray";
            document.querySelector(".btn-container").style.backgroundColor="lightgray";
            alert("You are out!");
        },300);
        reset();
    }
}
function btnPress(){
    let btn=this;//this is only those which is currently pressed
    console.log(btn);
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);
    checkAns(userSeq.length-1);
    console.log(`userseq = ${userSeq}`);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    score.push(level);
    level=0;
}