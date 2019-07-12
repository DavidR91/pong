const ballType = Symbol("ball");
const vec = require("./vec");

module.exports = (x, y, xDirection = 1, yDirection = 0) => {
	return {
		type: ballType,
		pos: vec(x, y),
		dir: vec(xDirection, yDirection),
		size: vec(2, 2), 
		speed: 32
	}
};