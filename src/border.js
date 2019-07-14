const borderType = Symbol("border");

// A border wall around the level preventing the ball from escaping
export const createBorder = (x, y, width, height, goalFor = -1) => {
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
		isDynamic: false,

		// Whether hitting this border is a goal
		isGoal: (goalFor >= 0), 
		goalPlayer: goalFor
	}
};