import step from "./step";
import render from "./render";
import input from "./input";
import { create as createRound } from "./round";
const clone = require("lodash.clonedeep");

let state = createRound();
let previous = clone(state);

function drawEvent() {

	let next = step(previous, state, input(state.paddle), 1/60);

	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

	render(next, context, canvas.width, canvas.height);

	previous = clone(next);
	state = next;

	// Reset on goal
	if (state.isGoalState) {
		state =  createRound();
	}

	window.requestAnimationFrame(drawEvent);
};

window.requestAnimationFrame(drawEvent);