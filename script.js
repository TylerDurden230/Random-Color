let body = document.getElementById('body');
let colorTxt = document.getElementById('color');
let copyBtn = document.getElementById('copy');

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
	let newColor = generateHexa();
	body.style.backgroundColor = newColor;
	colorTxt.innerHTML = newColor;
	copyBtn.style.display = 'block';
}


function copyText() {  
	let copyTxt = document.getElementById('color').innerHTML;
	navigator.clipboard.writeText(copyTxt);
	copyBtn.innerHTML = 'Copied!'
  }
  