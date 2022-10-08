const word = "BOMBZ";
let wordin = '';
let j=0;
const boxRows = document.querySelectorAll('.boxes-row');
let boxes = boxRows[j].querySelectorAll('.boxes');
const errorBox = document.querySelector('.error');

console.log(boxes); 
const buttons = document.querySelectorAll('.key');

let count = 0; //count of the number of boxes

function printing(letter){
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
            err = error();
            if(err==1){
                check();
                
                wordin='';
                rotating();
                setTimeout(()=>{keychange();
                console.log(120);},3000);
                console.log('j='+j);
                count=0;
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

function rotating(){
    for(let i=0;i<6;i++){
        setTimeout(()=>{
            if(i==5) j++;
            else{
                boxRows[j].querySelectorAll('.boxes')[i].classList.add('boxes-rotate');
            }
            boxes = boxRows[j].querySelectorAll('.boxes');
        }, i==5?i*200:i*250);
    }
}


function error(){
    if(count<5){
        boxRows[j].classList.add('boxes-row-shake');
        errorBox.classList.add('error-show');
        setTimeout(()=>{
            boxRows[j].classList.remove('boxes-row-shake');
            errorBox.classList.remove('error-show');
        }, 750);
        return 0;
    }
    else return 1;
}

function check(){
    for(var i=0;i<5;i++){
        for(var j=0;j<wordin.length;j++){
            if(word[j]===wordin[i]){
                if(i==j){
                    boxes[i].classList.add('green');
                    keychange(boxes[i].textContent,'green');
                }
                else{
                    boxes[i].classList.add('yellow');
                    keychange(boxes[i].textContent,'yellow');
                };
            }
            else{boxes[i].classList.add('grey');
            keychange(boxes[i].textContent,'grey');}
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