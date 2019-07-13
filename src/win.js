const clone = require("lodash.clonedeep");
const ball = require("./ball");

// Detect a win state
const step = (state, collisions) => {

	let next = clone(state);

	// Get all ball collisions
 	collisions.filter(c => c.a.type == ball.type).forEach(c => {

 		// If the ball is colliding with a goal
 		if (c.b.isGoal) {
 			next.isGoalState = true;
 		}
 	});

 	return next;
};

module.exports = {
	step
};