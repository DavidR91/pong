const ball = require("./ball");
const paddle = require("./paddle");

const randomDirection = () =>  {

	let range = ((Math.random() * 2) - 1);

	if (range == 0) {
		return 0;
	}

	return range / Math.abs(range);
};

// Create a new round (starting state)
const create = () => {
	return {
		ball: ball.create(50, 50, randomDirection(), randomDirection()),
		paddle: [
			paddle(0, 50, false),
			paddle(100, 50, true)
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

module.exports = {
	create
};