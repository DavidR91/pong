const clone = require("lodash.clonedeep");
import { clamp } from "./math";

export const ballMotion = (state, delta) => {

	let next = clone(state);

	next.pos.x += state.dir.x * state.speed * delta;
	next.pos.y += state.dir.y * state.speed * delta;

	return next;
};

export const paddleMotion = (state, yInput, delta) => {
	let next = clone(state);

	next.dir.y = yInput;
	next.speed = (Math.abs(yInput) * 100) * delta;
	next.pos.y += next.dir.y * next.speed;
	next.pos.y = clamp(next.pos.y, 0, 100);

	return next;
};
