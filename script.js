let body = document.getElementById("body");
let colorTxt = document.getElementById("color");
let copyBtn = document.getElementById("copy");
let saveBtn = document.getElementById("save");
let saved = document.getElementById("saved");
const MIN_CAPACITY = 3;
let capacity
let wWidth = window.innerWidth;
const ratio = 200;
let s = false;
let savedColors = [];
let newColor = "";

window.onload = function () {
  init();
};

window.addEventListener("resize", () => {
  wWidth = window.innerWidth;
  calcCapacity();
  let savedContainerHeight =
    Math.ceil(savedColors.length / capacity) * 125 < 1
      ? 125
      : Math.ceil(savedColors.length / capacity) * 125;
  saved.style.height = savedContainerHeight + "px";
  //console.log("savedHeight",savedContainerHeight, "Capacity: ",capacity, savedColors.length, wWidth);
  showColors();
});

document.getElementById("saved").addEventListener("click", function (event) {
  if (event.target.classList.contains("close")) {
    const colorId = event.target.parentNode.id;
    removeColor(colorId);
  }
});

document.getElementById("save").addEventListener("click", function () {
  saveColor();
});

document.getElementById("randomize").addEventListener("click", function () {
  changeColor();
});



function hideLoadingSpinner() {
  const spinnerElement = document.getElementById("loadingSpinner");
  spinnerElement.style.display = "none";
}

function init() {
  newColor = generateHexa();
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
  if (newColor) {
    body.style.backgroundColor = newColor;
    if (colorTxt != null) colorTxt.innerHTML = newColor;
    copyBtn.style.display = "block";
  }
}

function calcCapacity() {
  capacity = Math.floor(wWidth / ratio) < MIN_CAPACITY ? MIN_CAPACITY : Math.floor(wWidth / ratio);
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
    const colorDiv = document.createElement("div");
    colorDiv.id = savedColors[i];
    colorDiv.classList.add("box");
    colorDiv.style.backgroundColor = savedColors[i];

    const copyBtn = document.createElement("button");
    copyBtn.classList.add("copy");
    copyBtn.innerText = "c";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(savedColors[i]);
      alert("Copied");
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("close");
    removeBtn.innerText = "x";
    removeBtn.addEventListener("click", () => {
      removeColor(savedColors[i]);
    });

    const colorName = document.createElement("h6");
    colorName.innerText = savedColors[i];

    colorDiv.appendChild(copyBtn);
    colorDiv.appendChild(removeBtn);
    colorDiv.appendChild(colorName);

    saved.appendChild(colorDiv);
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

export { generateHexa };
