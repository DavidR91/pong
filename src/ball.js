const ballType = Symbol("ball");
const vec = require("./vec");
const clone = require("lodash.clonedeep");

const create = (x, y, xDirection = 1, yDirection = 0) => {
	return {
		type: ballType,
		pos: vec(x, y),
		dir: vec(xDirection, yDirection),
		size: vec(4, 4), 
		speed: 32,

		// Whether the ball is currently involved in a collision.
		//
		// Used to resolve things that should only occur once per
		// collision (vs. applying for every frame where the intersections
		// are still happening for a single collision event)
		isInCollision: false
	};
};

// Produce a new state for the ball given its current state and the set of all 
// known collisions
const collision = (ballState, collisions) => {
 	let next = clone(ballState);

 	// Assume no collisions initially
 	next.isInCollision = false;

 	// Get all collisions where we are the LHS
 	collisions.filter(c => c.a.type == ballState.type).forEach(c => {

 		// Now we definitely are colliding
 		next.isInCollision = true;
 		
 		if (c.intersection.w > c.intersection.h) {

 			// Headed down, obstacle below
 			if (ballState.dir.y > 0 && c.b.y > ballState.pos.y) {
	 			next.dir.y = -1;
	 		}

	 		// Headed up, obstacle above
	 		if (ballState.dir.y < 0 && c.b.y < ballState.pos.y) {
	 			next.dir.y = 1;
	 		}

	 		// Not moving vertically
	 		if (ballState.dir.y == 0) {
	 			if (c.intersection.y > ballState.pos.y) {
	 				next.dir.y = -Math.abs(next.dir.x);
	 			} else {
	 				next.dir.y = Math.abs(next.dir.x);
	 			}
	 		}

 		} else {

 			// Vertical
 			if (ballState.dir.x >= 0 && c.b.x > ballState.pos.x) {
	 			next.dir.x = -1;

	 			// If the target is moving, adopt its motion
	 			if (c.b.dir.y != 0) {
	 				next.dir.y = c.b.dir.y > 0 ? 1 : -1;
	 			}
	 		}

	 		if (ballState.dir.x < 0 && c.b.x < ballState.pos.x) {
	 			next.dir.x = 1;

	 			if (c.b.dir.y != 0) {
	 				next.dir.y = c.b.dir.y > 0 ? 1 : -1;
	 			}
	 		}
 		}

 	});

 	// If we have gone from not colliding to colliding
 	if (!ballState.isInCollision && next.isInCollision) {
 		// TODO: Ball could speed up or shrink etc. per collision
 		next.size.x *= 0.99;
 		next.size.y *= 0.99;
 	}

 	return next;
};

module.exports = {
	create, 
	collision,
	type: ballType
};