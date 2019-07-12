const motion = require("./motion");
const collision = require("./collision");
const clone = require("lodash.clonedeep");

// Given a state, proceed forward and return its successor
module.exports = (state, delta) => {

	let next = clone(state);

	next.ball = motion.ball(state.ball, delta);

	next.ball = collision.ball(next.ball, collision.step(state));

	return next;
};