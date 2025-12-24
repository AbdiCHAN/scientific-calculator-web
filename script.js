// script.js
const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const clickSound = document.getElementById('clickSound');
let memory = 0;

// Append value or function
function appendValue(value){ display.value += value; playClick(); }
function appendFunction(func){
  if(func==='sqrt') display.value+='Math.sqrt(';
  else if(func==='sin') display.value+='Math.sin(';
  else if(func==='cos') display.value+='Math.cos(';
  else if(func==='tan') display.value+='Math.tan(';
  else if(func==='log') display.value+='Math.log10(';
  else if(func==='^') display.value+='**';
  else if(func==='pi') display.value+='Math.PI';
  else if(func==='e') display.value+='Math.E';
  else if(func==='fact') display.value+='factorial(';
  playClick();
}

// Clear & Delete
function clearDisplay(){ display.value=''; playClick(); }
function deleteLast(){ display.value=display.value.slice(0,-1); playClick(); }

// Memory
function memoryAdd(){ memory+=Number(evalDisplay()); playClick(); }
function memorySubtract(){ memory-=Number(evalDisplay()); playClick(); }
function memoryRecall(){ display.value+=memory; playClick(); }
function memoryClear(){ memory=0; playClick(); }

// Theme
function toggleTheme(){ document.body.classList.toggle('light'); playClick(); }

// Evaluate
function calculateResult(){
  try{
    let expr = display.value;
    let result = evalDisplay(expr);
    addHistory(expr+' = '+result);
    display.value = result;
  } catch{ display.value='Error'; }
  playClick();
}

function evalDisplay(expr){
  expr = expr.replace(/(\d+)!/g,'factorial($1)');
  expr = expr.replace(/%/g,'/100');
  return eval(expr);
}

// Factorial
function factorial(n){
  n=Math.floor(n);
  if(n<0) return NaN;
  if(n===0) return 1;
  let res=1; for(let i=1;i<=n;i++) res*=i; return res;
}

// History & LocalStorage
function addHistory(entry){
  const li=document.createElement('li'); li.textContent=entry; historyList.prepend(li); saveHistory();
}
function saveHistory(){ localStorage.setItem('calcHistory',historyList.innerHTML); }
function loadHistory(){ historyList.innerHTML=localStorage.getItem('calcHistory')||''; }
loadHistory();

// Keyboard
document.addEventListener('keydown', e=>{
  if((e.key>='0'&&e.key<='9') || '+-*/().%'.includes(e.key)) appendValue(e.key);
  else if(e.key==='Enter') calculateResult();
  else if(e.key==='Backspace') deleteLast();
  else if(e.key.toLowerCase()==='c') clearDisplay();
});

// Click sound
function playClick(){ if(clickSound){ clickSound.currentTime=0; clickSound.play(); } }

// Drag & Drop Calculator Window
const calculatorContainer = document.getElementById('calculator-container');
let isDragging=false, offsetX=0, offsetY=0;
calculatorContainer.addEventListener('mousedown', e=>{
  isDragging=true;
  offsetX=e.clientX-calculatorContainer.offsetLeft;
  offsetY=e.clientY-calculatorContainer.offsetTop;
});
document.addEventListener('mouseup',()=>isDragging=false);
document.addEventListener('mousemove', e=>{
  if(isDragging){
    calculatorContainer.style.left=(e.clientX-offsetX)+'px';
    calculatorContainer.style.top=(e.clientY-offsetY)+'px';
    calculatorContainer.style.position='absolute';
  }
});
