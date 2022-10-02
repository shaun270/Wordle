const word = "BOMBZ";
var j=0;
const boxRows = document.querySelectorAll('.boxes-row');
var boxes = boxRows[j].querySelectorAll('.boxes');

console.log(boxes); 
const buttons = document.querySelectorAll('.key');

let count = 0; //count of the number of boxes

function printing(letter){
    letter = letter.toUpperCase();
    // printing the same letter in the boxes
    if(letter>='A' && letter<='Z'){
        if(letter==='DEL' || letter==='BACKSPACE' || letter==='DELETE'){
            if(count>0){count--;}
            boxes[count].textContent = '';
            boxes[count].classList.remove('boxes-anim');
        }
        else if(letter==='ENTER'){
            err = error();
            if(err==1){
                j++;
                count=0;
                boxes=boxRows[j].querySelectorAll('.boxes');
            }
            
        }
        else{
            boxes[count].textContent = letter;
            boxes[count].classList.add('boxes-anim');
            count++;
        }
    }
}

function error(){
    if(count<5){
        boxRows[j].classList.add('boxes-row-shake');
        setTimeout(()=>{
            boxRows[j].classList.remove('boxes-row-shake')} ,1000);
        return 0;
    }
    else return 1;
}

// click inputs
buttons.forEach(
    btn => {
        btn.addEventListener('click',function(){
            const letter = btn.textContent; 
            console.log(letter);
            printing(letter);
            console.log(count);
        })
    }
)

// Keyboard inputs
document.addEventListener('keypress',(event)=>{
    // console.log(event);
    console.log(event.key);
    console.log(count);
    printing(event.key);
})