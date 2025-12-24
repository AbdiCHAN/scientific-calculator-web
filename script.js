document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const historyList = document.getElementById("history-list");
  let currentValue = "";
  let previousValue = "";
  let operator = null;
  let memory = 0;

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      handleInput(button.getAttribute("data-value"));
    });
  });

  document.addEventListener("keydown", (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') handleInput(e.key);
    else if (['+', '-', '*', '/'].includes(e.key)) handleInput(e.key);
    else if (e.key === 'Enter') handleInput('=');
    else if (e.key === 'Backspace') handleInput('C');
  });

  function handleInput(value) {
    if (["MC","MR","M+","M-"].includes(value)) return handleMemory(value);

    switch (value) {
      case "C":
        currentValue = "";
        previousValue = "";
        operator = null;
        updateDisplay();
        break;
      case "=":
        calculate();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        setOperator(value);
        break;
      default:
        appendNumber(value);
        break;
    }
  }

  function appendNumber(num) {
    if (num === "." && currentValue.includes(".")) return;
    currentValue += num;
    updateDisplay();
  }

  function setOperator(op) {
    if (currentValue === "" && previousValue !== "") { operator = op; return; }
    if (previousValue !== "") calculate(); else previousValue = currentValue;
    currentValue = "";
    operator = op;
  }

  function calculate() {
    if (!operator || currentValue === "" || previousValue === "") return;
    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result;
    switch (operator) {
      case "+": result = prev + curr; break;
      case "-": result = prev - curr; break;
      case "*": result = prev * curr; break;
      case "/": result = curr === 0 ? "Error" : prev / curr; break;
      default: return;
    }
    addHistory(`${previousValue} ${operator} ${currentValue} = ${result}`);
    currentValue = result.toString();
    previousValue = "";
    operator = null;
    updateDisplay();
  }

  function updateDisplay() { display.value = currentValue || "0"; }

  function handleMemory(action) {
    const currNum = parseFloat(currentValue) || 0;
    switch(action) {
      case "MC": memory = 0; break;
      case "MR": currentValue = memory.toString(); updateDisplay(); break;
      case "M+": memory += currNum; break;
      case "M-": memory -= currNum; break;
    }
  }

  function addHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
    if (historyList.children.length > 10) historyList.removeChild(historyList.lastChild);
  }
});
