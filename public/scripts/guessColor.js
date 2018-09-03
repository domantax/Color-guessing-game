//=============setting variables=======================

var colorsNum = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("correctnessMessage");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");
// ===============variables end===============================

game();

// ===================functions===============================
function game () {
	reset ();
	squaresFunctionality();
	resetBtnFunctionality ();
	modeBtnFunctionality ();
}

//resets the game(changes colors of the squares, resetting buttons and text);
function reset () {
	colors = generateRandomColors(colorsNum);
	pickedColor = pickRandomColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	message.textContent = "";
	resetButton.textContent = "New Colors";
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

//apply functionality to the squares (check if clicked square color matches RGB if yes win!! if no try again) 
function squaresFunctionality () {	
	for (var i = 0; i < squares.length; i++) {
		//when clicked on right or wrong color alert
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;	
			if (clickedColor === pickedColor) {
				message.textContent = "Correct!!!";
				colorChange(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play again";
			} else {
				this.style.backgroundColor = "#232323";
				message.textContent = "Try again";
			}
		});
	}
}	

//changing between jard and easy modes
function modeBtnFunctionality () {
	for (var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click", function () {
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? colorsNum = 3: colorsNum = 6;
			reset();
		});
	}
}

//reset button functionality (resets to new colors)
function resetBtnFunctionality () {
	resetButton.addEventListener("click", function() {
		reset();
	});
}

//function to generate Colors randomly
function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
		arr.push(rgb);
	}
	return arr;
}

//function changing color (used to change all squares to the right square color)
function colorChange (color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//pick random color (used to pick color from colors array)
function pickRandomColor () {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}
