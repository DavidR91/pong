const borderType = Symbol("border");

// A border wall around the level preventing the ball from escaping
module.exports = (x, y, width, height) => {
	return {
		type: borderType,
		x: x, 
		y: y, 
		w: width, 
		h: height,
		dir: {
			x: 0, 
			y: 0
		},
		isDynamic: false
	}
};