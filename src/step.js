const motion = require("./motion");
const collision = require("./collision");
const clone = require("lodash.clonedeep");
const ball = require("./ball");
const ai = require("./ai");
const win = require("./win");

// Given a state, proceed forward and return its successor
module.exports = (previous, current, inputs, delta) => {

	let next = clone(current);

	next.ai = current.ai.map((v, index) => ai.step(current.ball, previous.ai[index], current.paddle[index].pos, delta));

	next.paddle = current.paddle.map((v, index) => motion.paddle(v, v.isAi ? next.ai[index] : inputs[index], delta));

	next.collisions = collision.step(current);

	next.ball = ball.collision(motion.ball(current.ball, delta), next.collisions.detected);

	return win.step(next, next.collisions.detected);
};