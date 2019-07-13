const coll = require("./collidables");
const clone = require("lodash.clonedeep");

// Produce the set of all collisions
const step = (state) => {

	let hulls = coll.forState(state);

	let results = {
		hulls: hulls,
		detected: []
	};

	// On^2 collision
	hulls.forEach((h, index) => {

		// Don't bother with wall vs. wall collisions for example
		if (!h.isDynamic) {
			return;
		}

		hulls.forEach((other, otherIndex) => {

			if (otherIndex == index) {
				return;
			}

			if (coll.isOverlap(h, other)) {
				results.detected.push({
					a: h, 
					b: other,
					intersection: coll.intersection(h, other)
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

 	// Assume no collisions initially
 	next.isInCollision = false;

 	// Get all collisions where we are the LHS
 	collisions.filter(c => c.a.type == state.type).forEach(c => {

 		// Now we definitely are colliding
 		next.isInCollision = true;
 		
 		if (c.intersection.w > c.intersection.h) {

 			// Headed down, obstacle below
 			if (state.dir.y > 0 && c.b.y > state.pos.y) {
	 			next.dir.y = -1;
	 		}

	 		// Headed up, obstacle above
	 		if (state.dir.y < 0 && c.b.y < state.pos.y) {
	 			next.dir.y = 1;
	 		}

	 		// Not moving vertically
	 		if (state.dir.y == 0) {
	 			if (c.intersection.y > state.pos.y) {
	 				next.dir.y = -Math.abs(next.dir.x);
	 			} else {
	 				next.dir.y = Math.abs(next.dir.x);
	 			}
	 		}

 		} else {

 			// Vertical
 			if (state.dir.x >= 0 && c.b.x > state.pos.x) {
	 			next.dir.x = -1;

	 			// If the target is moving, adopt its motion
	 			if (c.b.dir.y != 0) {
	 				next.dir.y = c.b.dir.y > 0 ? 1 : -1;
	 			}
	 		}

	 		if (state.dir.x < 0 && c.b.x < state.pos.x) {
	 			next.dir.x = 1;

	 			if (c.b.dir.y != 0) {
	 				next.dir.y = c.b.dir.y > 0 ? 1 : -1;
	 			}
	 		}
 		}

 	});

 	// If we have gone from not colliding to colliding, up out speed
 	if (!state.isInCollision && next.isInCollision) {
 		console.log(next.dir);
 	}

 	return next;
};

module.exports = {
	step,
	ball
};