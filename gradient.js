import { generateHexa, calcCapacity } from "./script.js";

let gradient = document.getElementById("body");
let copyBtn = document.getElementById("copy");
let code = document.getElementById("code");
let savedDiv = document.getElementById("savedGradients");
let savedGradients = [];
let newGradient = "";

let degs = 0;
let color1 = "";
let color2 = "";

window.onload = function () {
  console.log("loaded");
	changeGradient();
  if (localStorage.getItem("savedGradients") != null)
    savedGradients = JSON.parse(localStorage.getItem("savedGradients"));
  showGradients();
};

window.addEventListener("resize", () => {
  wWidth = window.innerWidth;
  calcCapacity();
  let savedContainerHeight =
    Math.ceil(savedGradients.length / capacity) * 125 < 1
      ? 125
      : Math.ceil(savedGradients.length / capacity) * 125;
  savedDiv.style.height = savedContainerHeight + "px";
  showGradients();
});
	
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
  newGradient = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
  gradient.style.background = newGradient;
  code.innerHTML = `background: ${newGradient};`;
  copyBtn.style.display = "block";
}

function setNewGradient() {
  if (newGradient) {
    gradient.style.background = newGradient;
    code.innerHTML = `background: ${newGradient};`;
    copyBtn.style.display = "block";
  }
}

function changeGradient() {
  copyBtn.innerHTML = "Copy";
  color1 = generateHexa();
  color2 = generateHexa();
  newGradient = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
  gradient.style.background = newGradient;
  code.innerHTML = `background: ${newGradient};`;
  copyBtn.style.display = "block";
  setNewGradient();
}

function saveGradient() {
  if (savedGradients.includes(newGradient)) {
    alert("Gradient already saved");
  } else {
    savedGradients.push(newGradient);
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
  clear(savedDiv);
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
    savedDiv.appendChild(gradientDiv);
  }
}


// background: linear-gradient(0deg, #126868, #669172);
