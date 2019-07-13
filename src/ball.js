const ballType = Symbol("ball");
const vec = require("./vec");

module.exports = (x, y, xDirection = 1, yDirection = 0) => {
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
	}
};