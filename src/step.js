const clone = require("lodash.clonedeep");
import collision from "./collision";
import { ballMotion, paddleMotion } from "./motion";
import { ballCollision } from "./ball";
import ai from "./ai";
import win from "./win";

// Given a state, proceed forward and return its successor
export default (previous, current, inputs, delta) => {

	let next = clone(current);

	next.ai = current.ai.map((v, index) => ai(current.ball, previous.ai[index], current.paddle[index].pos, delta));

	next.paddle = current.paddle.map((v, index) => paddleMotion(v, v.isAi ? next.ai[index] : inputs[index], delta));

	next.collisions = collision(current);

	next.ball = ballCollision(ballMotion(current.ball, delta), next.collisions.detected);

	return win(next, next.collisions.detected);
};