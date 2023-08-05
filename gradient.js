import { generateHexa } from "./script.js";

let gradient = document.getElementById("body");
let copyBtn = document.getElementById("copy");
let code = document.getElementById("code");
let saved = document.getElementById("saved");
let savedGradients = [];
let newGradient = "";

let degs = 0;
let color1 = "";
let color2 = "";
let style = "";

window.onload = function () {
	changeGradient();
  };
	
document.getElementById("deg").oninput = function () {
  setDegrees();
};

document.getElementById("randomize").addEventListener("click", function () {
	changeGradient();
  });

document.getElementById("save").addEventListener("click", function () {
  saveGradient();
});

function setDegrees() {
  let val = document.getElementById("deg").value;
  changeDegs(val);
}

function changeDegs(val) {
  degs = val;
  style = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
  gradient.style.background = style;
  code.innerHTML = `background: ${style};`;
  copyBtn.style.display = "block";
}

function setNewGradient() {
  if (style) {
    gradient.style.background = style;
    code.innerHTML = `background: ${style};`;
    copyBtn.style.display = "block";
  }
}

function changeGradient() {
  copyBtn.innerHTML = "Copy";
  color1 = generateHexa();
  color2 = generateHexa();
  style = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
  gradient.style.background = style;
  code.innerHTML = `background: ${style};`;
  copyBtn.style.display = "block";
  setNewGradient();
}

function saveGradient() {
  if (style) {
    savedGradients.push(style);
    showGradients();
    localStorage.setItem("savedGradients", JSON.stringify(savedGradients));
  }
}

function removeGradient(id) {
  const index = savedGradients.indexOf(id);
  if (index > -1) savedGradients.splice(index, 1);
  showGradients();
  localStorage.setItem("savedGradients", JSON.stringify(savedGradients));
}


function clear(elementToClear) {
  elementToClear.innerHTML = "";
}

function copyText() {
  let copyTxt = document.getElementById("code").innerHTML;
  navigator.clipboard.writeText(copyTxt);
  copyBtn.innerHTML = "Copied!";
}

function showGradients(){
  clear(saved);
  for (let i = 0; i < savedGradients.length; i++) {
    const gradientDiv = document.createElement("div");
    gradientDiv.id = savedGradients[i];
    gradientDiv.classList.add("box");
    gradientDiv.style.background = savedGradients[i];

    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy");
    copyBtn.innerText = "c";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(savedGradients[i]);
      alert("Copied");
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("close");
    removeBtn.innerText = "x";
    removeBtn.addEventListener("click", () => {
      removeGradient(savedGradients[i]);
    });
    gradientDiv.appendChild(copyBtn);
    gradientDiv.appendChild(removeBtn);
    saved.appendChild(gradientDiv);
  }
}


// background: linear-gradient(0deg, #126868, #669172);
