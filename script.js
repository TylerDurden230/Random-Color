let body = document.getElementById("body");
let colorTxt = document.getElementById("color");
let copyBtn = document.getElementById("copy");
let saveBtn = document.getElementById("save");
let saved = document.getElementById("saved");
let capacity;
let wWidth = window.innerWidth;
const ratio = 200;
let s = false;
let savedColors = [];
let newColor = "";
let closeBtns;

window.onload = function () {
  init();
};

window.addEventListener("resize", () => {
  wWidth = window.innerWidth;
  calcCapacity();
  let savedContainerHeight = Math.ceil(savedColors.length / capacity) * 125;
  saved.style.height = savedContainerHeight + "px";
  //console.log("savedHeight",savedContainerHeight, "Capacity: ",capacity, savedColors.length, wWidth);
  showColors();
});

function showLoadingSpinner() {
  const spinnerElement = document.getElementById("loadingSpinner");
  spinnerElement.style.display = "block";
}

function hideLoadingSpinner() {
  const spinnerElement = document.getElementById("loadingSpinner");
  spinnerElement.style.display = "none";
}

function init() {
  newColor = generateHexa()
  setNewColor();
  if (localStorage.getItem("savedColors") != null)
    savedColors = JSON.parse(localStorage.getItem("savedColors"));
  calcCapacity();
  showColors();
  hideLoadingSpinner();
  document.getElementById("megacontainer").style.display = "flex";
}

function generateRandom(maxLimit) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

function generateHexa() {
  const arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let color = "#";
  for (let i = 0; i < 6; i++) color += arr[generateRandom(16)];
  return color;
}

function setNewColor() {
  body.style.backgroundColor = newColor;
  colorTxt.innerHTML = newColor;
  copyBtn.style.display = "block";
}

function calcCapacity() {
  capacity = Math.floor(wWidth / ratio);
}

function changeColor() {
  copyBtn.innerHTML = "Copy";
  saveBtn.innerHTML = "Save";
  s = false;
  newColor = generateHexa();
  setNewColor();
}

function clear(elementToClear) {
  elementToClear.innerHTML = "";
}

function saveColor() {
  if (!s)
    if (savedColors.length < capacity) {
      savedColors.push(newColor);
      saveBtn.innerHTML = "Saved!";
      s = true;
      showColors();
    } else {
      savedColors.shift();
      savedColors[capacity - 1] = newColor;
      s = true;
      showColors();
    }
  else saveBtn.innerHTML = "Already saved!";
  localStorage.setItem("savedColors", JSON.stringify(savedColors));
}

function removeColor(id) {
  const index = savedColors.indexOf(id);
  if (index > -1) savedColors.splice(index, 1); // 2nd parameter means remove one item only
  showColors();
  localStorage.setItem("savedColors", JSON.stringify(savedColors));
}

function showColors() {
  clear(saved);
  for (let i = 0; i < savedColors.length; i++) {
    saved.innerHTML += `<div id="${savedColors[i]}" class="box" style="background-color: ${savedColors[i]};">
			<button onclick="copy('${savedColors[i]}')" class="copy">c</button>
			<button onclick="removeColor('${savedColors[i]}')" class="close">x</button>
			<h6>${savedColors[i]}</h6></div>`;
  }
}

function copy(id) {
  navigator.clipboard.writeText(id);
  alert("Copied");
}

function copyText() {
  let copyTxt = document.getElementById("color").innerHTML;
  navigator.clipboard.writeText(copyTxt);
  copyBtn.innerHTML = "Copied!";
}

export { generateHexa, generateRandom, calcCapacity, showColors, removeColor, copy, copyText, saveColor, clear, changeColor, setNewColor, showLoadingSpinner, hideLoadingSpinner };