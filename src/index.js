const ball = require("./ball");
const paddle = require("./paddle");
const step = require("./step");
const render = require("./render");

const defaultState = {
	ball: ball(50, 50),
	paddle: [
		paddle(0, 50),
		paddle(100, 50)
	]
};

let state = defaultState;

state.paddle[0].dir.y = 1;

let states = [];

function drawEvent() {

	state = step(state, 1/60);
	states.push(state);

	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

	states.forEach(s =>	render(s, context, canvas.width, canvas.height));

	window.requestAnimationFrame(drawEvent);

	states = states.slice(-100);
};

window.requestAnimationFrame(drawEvent);