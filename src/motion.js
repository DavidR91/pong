const clone = require("lodash.clonedeep");

const ball = (state, delta) => {

	let next = clone(state);

	next.pos.x += state.dir.x * state.speed * delta;
	next.pos.y += state.dir.y * state.speed * delta;

	return next;
};

module.exports = {
	ball
};