const step = require("./step");
const render = require("./render");
const input = require("./input");
const round = require("./round");
const clone = require("lodash.clonedeep");

let state = round.create();
let previous = clone(state);

function drawEvent() {

	let next = step(previous, state, input.step(state.paddle), 1/60);

	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

	render(next, context, canvas.width, canvas.height);

	previous = clone(next);
	state = next;

	// Reset on goal
	if (state.isGoalState) {
		state =  round.create();
	}

	window.requestAnimationFrame(drawEvent);
};

window.requestAnimationFrame(drawEvent);