const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const angleToggle = document.getElementById("angleToggle");
const clickSound = new Audio("assets/click.mp3");

let expr = "";
let isDeg = true;

function updateDisplay(v = expr) {
  display.value = v || "0";
}

function factorial(n) {
  if (!Number.isInteger(n) || n < 0) return NaN;
  return n <= 1 ? 1 : n * factorial(n - 1);
}

angleToggle.onclick = () => {
  isDeg = !isDeg;
  angleToggle.textContent = isDeg ? "DEG" : "RAD";
};

function sanitize(e) {
  return e
    .replace(/π/g, Math.PI)
    .replace(/\be\b/g, Math.E)
    .replace(/\^/g, "**")
    .replace(/sqrt\(/g, "Math.sqrt(")
    .replace(/abs\(/g, "Math.abs(")
    .replace(/log\(/g, "Math.log10(")
    .replace(/ln\(/g, "Math.log(")
    .replace(/sin\(/g, isDeg ? "Math.sin(Math.PI/180*" : "Math.sin(")
    .replace(/cos\(/g, isDeg ? "Math.cos(Math.PI/180*" : "Math.cos(")
    .replace(/tan\(/g, isDeg ? "Math.tan(Math.PI/180*" : "Math.tan(")
    .replace(/(\d+)!/g, "factorial($1)");
}

function evaluate() {
  try {
    const result = Function(
      "factorial",
      `"use strict";return(${sanitize(expr)})`
    )(factorial);

    if (!isFinite(result)) throw Error();

    historyList.innerHTML += `<li>${expr} = ${result}</li>`;
    expr = result.toString();
  } catch {
    expr = "Error";
  }
  updateDisplay();
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.onclick = () => {
    clickSound.currentTime = 0;
    clickSound.play();

    const v = btn.dataset.value;
    const a = btn.dataset.action;

    if (a === "clear") expr = "";
    else if (a === "delete") expr = expr.slice(0, -1);
    else if (a === "equals") return evaluate();
    else expr += v;

    updateDisplay();
  };
});

document.addEventListener("keydown", e => {
  if (/[0-9.+\-*/()]/.test(e.key)) expr += e.key;
  else if (e.key === "Enter") return evaluate();
  else if (e.key === "Backspace") expr = expr.slice(0, -1);
  else if (e.key === "Escape") expr = "";
  updateDisplay();
});

