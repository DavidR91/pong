const clone = require("lodash.clonedeep");
import { ballType } from "./ball";

// Detect a win state
export default (state, collisions) => {

	let next = clone(state);

	// Get all ball collisions
 	collisions.filter(c => c.a.type == ballType).forEach(c => {

 		// If the ball is colliding with a goal
 		if (c.b.isGoal) {
 			next.isGoalState = true;
 		}
 	});

 	return next;
};