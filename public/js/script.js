const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");
const playButton = document.querySelector(".play-btn");
const gridWidth = 500;
const squaresArray = [];
let squares;
let mole;
let score = 0;
let gameOn = false;

const createSquares = () => {
	for (let i = 0; i < gridWidth / 5; i++) {
		const square = document.createElement("div");
		square.setAttribute("class", "square");
		square.setAttribute("id", i);
		grid.appendChild(square);
		squaresArray.push(square);
	}
};

const createMole = () => {
	squares = [...document.querySelectorAll(".square")];
	squares[Math.floor((Math.random() * gridWidth) / 5)].classList.add("mole");
};

const removeMole = () => {
	mole = document.querySelector(".mole");
	if (mole) {
		mole.classList.remove("mole");
	}
};

const addPoint = () => {
	squares.forEach((item) => {
		item.addEventListener("click", () => {
			if (item.classList.contains("mole")) {
				score++;
				removeMole();
				scoreDisplay.textContent = score;
			}
		});
	});
};

const hidePlayButton = () => {
	document.querySelector(".play-btn").classList.add("hidden");
};

const showPlayButton = () => {
	document.querySelector(".play-btn").classList.remove("hidden");
};

const timer = () => {
	gameOn = true;
	score = 0;
	scoreDisplay.textContent = score;
	let intervalSpeed = 2000;
	let tickInterval;
	let changeInterval;
	let speedChange = false;

	hidePlayButton();

	const tick = () => {
		removeMole();
		if (speedChange) {
			speedChange = false;
			clearInterval(tickInterval);
			tickInterval = setInterval(tick, intervalSpeed);
		}
		createMole();
		addPoint();
	};

	const changeSpeed = () => {
		if (intervalSpeed > 200) {
			intervalSpeed -= 200;
			speedChange = true;
		} else {
			clearInterval(tickInterval);
			clearInterval(changeInterval);
			removeMole();
			gameOn = false;
			showPlayButton();
		}
	};

	tick();
	tickInterval = setInterval(tick, intervalSpeed);
	changeInterval = setInterval(changeSpeed, 4000);
};

createSquares();

playButton.addEventListener("click", () => {
	if (!gameOn) {
		timer();
	}
});
