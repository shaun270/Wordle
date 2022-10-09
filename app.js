// variables
const word = "BOMBS";
let wordin = '';
let j=0;
const boxRows = document.querySelectorAll('.boxes-row');
let boxes = boxRows[j].querySelectorAll('.boxes');
const errorBox = document.querySelectorAll('.error');
const buttons = document.querySelectorAll('.key');
let count = 0; //count of the number of boxes
let stat; // status of the api request
let data =''; 
let requestUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
let victory=0;

// backend

async function makeRequest(requestUrl){
    const response = await fetch(requestUrl);
    data = await response.json();
    stat = response.status;
    if(!response.ok){
        console.log('Failed to fetch :(', stat);
    }
    else console.log('Victory!!!!', stat);
};

async function printing(letter){
    letter = letter.toUpperCase();
    // handling different events
    if(letter>='A' && letter<='Z'){
        if(letter==='DEL' || letter==='BACKSPACE' || letter==='DELETE'){
            if(count>0){count--;}
            wordin = wordin.slice(0, -1);
            boxes[count].textContent = '';
            boxes[count].classList.remove('boxes-anim');
        }
        else if(letter==='ENTER'){
            let err = error(0);
            if(err==1){
                requestUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordin}`;
                // console.log(requestUrl);
                await makeRequest(requestUrl);
                // console.log(data);
                if(stat==200)
                {
                    // console.log(stat);
                    // console.log(data);
                    if(word===wordin){
                        victory = 1;
                        anim('boxes-vict');
                    }
                    else anim('boxes-rotate');
                    check();
                    wordin='';
                    setTimeout(()=>{keychange();},3000);
                    count=0;
                }                
                else{
                    // console.log(stat);
                    boxRows[j].classList.add('boxes-row-shake');
                    errorBox[1].classList.add('error-show');
                    setTimeout(()=>{
                        boxRows[j].classList.remove('boxes-row-shake');
                        errorBox[1].classList.remove('error-show');
                    }, 750);
                }
                
            }
        }
        else{
            boxes[count].textContent = letter;
            boxes[count].classList.add('boxes-anim');
            count++;
            wordin += letter;
            // console.log(wordin);
        }
    }
}

function anim(animName){
    console.log(animName);
    for(let i=0;i<6;i++){
        setTimeout(()=>{
            if(i==5 && j!=5) j++;
            else{
                boxRows[j].querySelectorAll('.boxes')[i].classList.add(animName);
            }
            boxes = boxRows[j].querySelectorAll('.boxes');
        }, i==5?i*200:i*250);
    }
}

function error(ind){
    if(count<5){
        boxRows[j].classList.add('boxes-row-shake');
        errorBox[ind].classList.add('error-show');
        setTimeout(()=>{
            boxRows[j].classList.remove('boxes-row-shake');
            errorBox[ind].classList.remove('error-show');
        }, 750);
        return 0;
    }
    else return 1;
}

function check(){
    let copy=word;
    for(var i=0;i<5;i++){
        for(var j=0;j<5;j++){
            if(copy[j]===wordin[i]){
                copy=copy.substring(0,j)+'1'+copy.substring(j+1);
                if(i==j){
                    boxes[i].classList.add('green');
                    keychange(boxes[i].textContent,'green');
                }
                else{
                    boxes[i].classList.add('yellow');
                    keychange(boxes[i].textContent,'yellow');
                }
                break;
            }
            else{boxes[i].classList.add('grey');
            keychange(boxes[i].textContent,'grey');}
        }
        // console.log("i"+i);
        if(i==5){
            alert("bas bhai hogaya tera chance");
            break;
        }
        
    }
}

function keychange(letter,color){
    for(var i=0;i<buttons.length;i++){
        if(letter===buttons[i].textContent){
            buttons[i].classList.add(color);
            // console.log(buttons[i].classList);
        }
    }
}
// click inputs
buttons.forEach(
    btn => {
        btn.addEventListener('click',function(){
            const letter = btn.textContent; 
            // console.log(letter);
            printing(letter);
            // console.log(count);
        })
    }
)

// Keyboard inputs
document.addEventListener('keypress',(event)=>{
    // console.log(event);
    // console.log(event.key);
    // console.log(count);
    printing(event.key);
})

console.log('It\'s working!');