// Get display element
const display = document.getElementById("display");

// Store current and previous values
let currentValue = "";
let previousValue = "";
let operator = null;

// Handle button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

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
  });
});

// Append number or dot
function appendNumber(num) {
  // Prevent multiple dots
  if (num === "." && currentValue.includes(".")) return;
  currentValue += num;
  updateDisplay();
}

// Set operator
function setOperator(op) {
  if (currentValue === "" && previousValue !== "") {
    operator = op;
    return;
  }
  if (previousValue !== "") {
    calculate();
  } else {
    previousValue = currentValue;
  }
  currentValue = "";
  operator = op;
}

// Perform calculation
function calculate() {
  if (!operator || currentValue === "" || previousValue === "") return;

  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  let result;

  switch (operator) {
    case "+": result = prev + curr; break;
    case "-": result = prev - curr; break;
    case "*": result = prev * curr; break;
    case "/": 
      result = curr === 0 ? "Error" : prev / curr; 
      break;
    default: return;
  }

  currentValue = result.toString();
  previousValue = "";
  operator = null;
  updateDisplay();
}

// Update the display
function updateDisplay() {
  display.value = currentValue;
}
