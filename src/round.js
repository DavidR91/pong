import { createBall } from "./ball";
import { createPaddle } from "./paddle";

const randomDirection = () =>  {

	let range = ((Math.random() * 2) - 1);

	if (range == 0) {
		return 0;
	}

	return range / Math.abs(range);
};

// Create a new round (starting state)
export const create = () => {
	return {
		ball: createBall(50, 50, randomDirection(), randomDirection()),
		paddle: [
			createPaddle(0, 50, true),
			createPaddle(100, 50, true)
		],

		collisions: [], 

		// Normalized Y inputs for the AI
		ai: [ 
			0,
			0
		],

		// Whether this state contains a goal being scored 
		isGoalState: false
	};
};