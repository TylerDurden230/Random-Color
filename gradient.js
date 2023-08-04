import { generateHexa } from "./script.js";

document.addEventListener("DOMContentLoaded", function() {

let gradient = document.getElementById("body");
let copyBtn = document.getElementById("copy");
let code = document.getElementById("code");
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

function changeGradient() {
  copyBtn.innerHTML = "Copy";
  color1 = generateHexa();
  color2 = generateHexa();
  style = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
  gradient.style.background = style;
  code.innerHTML = `background: ${style};`;
  copyBtn.style.display = "block";
}

function copyText() {
  let copyTxt = document.getElementById("code").innerHTML;
  navigator.clipboard.writeText(copyTxt);
  copyBtn.innerHTML = "Copied!";
}

});