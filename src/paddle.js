const paddleType = Symbol("paddle");
const vec = require("./vec");

module.exports = (x, y) => {
	return {
		type: paddleType,
		pos: vec(x, y),
		size: vec(4, 8),
		dir: vec(0, 0),
	};
};
