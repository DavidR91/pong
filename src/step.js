const motion = require("./motion");
const collision = require("./collision");
const clone = require("lodash.clonedeep");

// Given a state, proceed forward and return its successor
module.exports = (state, input, delta) => {

	let next = clone(state);

	next.ball = motion.ball(state.ball, delta);

	state.paddle.forEach((p, index) => {
		next.paddle[index] = motion.paddle(p, input[index], delta);
	});

	next.collisions = collision.step(state);

	next.ball = collision.ball(next.ball, next.collisions.detected);

	return next;
};