
let gradient = document.getElementById('body');
let copyBtn = document.getElementById('copy');
let code = document.getElementById('code');

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

function changeGradient(){
    copyBtn.innerHTML = 'Copy';
    let color1 = generateHexa();
    let color2 = generateHexa();
    let style = `linear-gradient(to right, ${color1}, ${color2})`
    gradient.style.background = style;
    code.innerHTML = style;
    copyBtn.style.display = 'block';
}

function copyText() {  
	let copyTxt = document.getElementById('code').innerHTML;
	navigator.clipboard.writeText(copyTxt);
	copyBtn.innerHTML = 'Copied!';
  }