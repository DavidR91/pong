import collision from "./collision";
import { ballMotion, paddleMotion } from "./motion";
import { ballCollision } from "./ball";
import aiStep from "./ai";
import { ballType } from "./ball";

// Given a state, proceed forward and return its successor
export default (previous, current, inputs, delta) => {

	let ai = current.ai.map((v, index) => aiStep(current.ball, previous.ai[index], current.paddle[index].pos, delta));

	let paddle = current.paddle.map((v, index) => paddleMotion(v, v.isAi ? ai[index] : inputs[index], delta));

	let collisions = collision(current);

	let ball = ballCollision(ballMotion(current.ball, delta), collisions.detected);

	return {
		ai, 
		paddle,
		collisions, 
		ball,
		isGoalState: collisions.detected.some(c => c.a.type == ballType && c.b.isGoal)
	};
};