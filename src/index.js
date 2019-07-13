const step = require("./step");
const render = require("./render");
const input = require("./input");
const round = require("./round");
const ai = require("./ai");
const clone = require("lodash.clonedeep");

let state = round.create();
let last = clone(state);

let aiInput = 0;

function drawEvent() {

	state.inputs = input.collect(state);

	state.inputs[0] = ai.step(state, last.inputs[0], state.paddle[0].pos, 1/60)
	state.inputs[1] = ai.step(state, last.inputs[1], state.paddle[1].pos, 1/60)

	state = step(state, state.inputs, 1/60);
	let canvas = document.getElementById('canvas');
	let context = canvas.getContext('2d');

	context.clearRect(0, 0, canvas.width, canvas.height);

	render(state, context, canvas.width, canvas.height);

	window.requestAnimationFrame(drawEvent);
	last = clone(state);
};

window.requestAnimationFrame(drawEvent);