const coll = require("./collidables");
const clone = require("lodash.clonedeep");

// Produce the set of all collisions
const step = (state) => {

	let hulls = coll.forState(state);

	let results = [];

	// On^2 collision
	hulls.forEach((h, index) => {

		hulls.forEach((other, otherIndex) => {

			if (otherIndex == index) {
				return;
			}

			if (coll.isOverlap(h, other)) {
				results.push({
					a: h, 
					b: other
				});
			}

		});

	});

	return results;
};

// Produce a new state for the ball given its current state and the set of all 
// known collisions
const ball = (state, collisions) => {
 	let next = clone(state);

 	// Get all collisions where we are the LHS
 	collisions.filter(c => c.a.type == state.type).forEach(c => {

 		if (c.b.x > state.pos.x) {
 			next.dir.x = -1;
 		} else {
 			if (c.b.x < state.pos.x) {
 				next.dir.x = 1;
 			}	 
 		}

 		// If what we collided with was in motion vertically, 
 		// match its direction
 		//
 		if (c.b.dir.y != 0) {
 			next.dir.y = c.b.dir.y;
 		}

 	});

 	return next;
};

module.exports = {
	step,
	ball
};