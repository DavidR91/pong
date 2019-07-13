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
		ball: ball(50, 50, randomDirection(), randomDirection()),
		paddle: [
			paddle(0, 50),
			paddle(100, 50)
		],
		collisions: [],
		inputs: [0, 0]
	};
};

module.exports = {
	create
};