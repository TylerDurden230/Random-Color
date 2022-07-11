let body = document.getElementById('body');
let colorTxt = document.getElementById('color');
let copyBtn = document.getElementById('copy');
let saveBtn = document.getElementById('save');
let saved = document.getElementById('saved');

let savedColors = [];
let newColor = '';

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
	console.log(color);
	return color;
}

function changeColor() {
	copyBtn.innerHTML = 'Copy';
	saveBtn.innerHTML = 'Save';
	newColor = generateHexa();
	body.style.backgroundColor = newColor;
	colorTxt.innerHTML = newColor;
	copyBtn.style.display = 'block';
}

function clear(elementToClear)
{
	elementToClear.innerHTML = '';
}

function saveColor() {
	savedColors.push(newColor);
	saveBtn.innerHTML = 'Saved!';
	showColors();
}

function showColors() {
	if (savedColors.length > 0) {
		clear(saved);
		for(let i = 0; i < savedColors.length; i++)
		{
			saved.innerHTML += `<h3>${savedColors[i]}</h3>`;
		}
	}
	console.log(savedColors);
}

function copyText() {  
	let copyTxt = document.getElementById('color').innerHTML;
	navigator.clipboard.writeText(copyTxt);
	copyBtn.innerHTML = 'Copied!'
  }
  