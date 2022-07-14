
let gradient = document.getElementById('body');
let copyBtn = document.getElementById('copy');
let code = document.getElementById('code');
let degs = 0;
let color1 = '';
let color2 = '';
let style = '';

document.getElementById("deg").oninput = function() {
	setDegrees();
};

function setDegrees() {
	let val = document.getElementById("deg").value
	changeDegs(val);
 }

function generateRandom(maxLimit){
	let rand = Math.random() * maxLimit;
	rand = Math.floor(rand);
	return rand;
}

function generateHexa(){
	const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	let color = '#';
	for(let i = 0; i < 6; i++)
		color += arr[generateRandom(16)];
	return color;
}

function changeDegs(val) {
	degs = val;
	style = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
	gradient.style.background = style;
    code.innerHTML = `background: ${style};`;
    copyBtn.style.display = 'block';
}

function changeGradient(){
    copyBtn.innerHTML = 'Copy';
    color1 = generateHexa();
    color2 = generateHexa();
    style = `linear-gradient(${degs}deg, ${color1}, ${color2})`;
    gradient.style.background = style;
    code.innerHTML = `background: ${style};`;
    copyBtn.style.display = 'block';
}

function copyText() {  
	let copyTxt = document.getElementById('code').innerHTML;
	navigator.clipboard.writeText(copyTxt);
	copyBtn.innerHTML = 'Copied!';
  }