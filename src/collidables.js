// Create a collidable for an object with size and position 
const create = (obj) => {
	return {
		type: obj.type,
		x: obj.pos.x, 
		y: obj.pos.y, 
		w: obj.size.x, 
		h: obj.size.y,
		dir: {...obj.dir}
	}
};

// Is there overlap between two collidables
const isOverlap = (a, b) => {

	// Adapted from SDL_HasIntersection

	// Horizontal
	let aMinimum = a.x;
	let aMaximum = aMinimum + a.w;
	let bMinimum = b.x;
	let bMaximum = bMinimum + b.w;

	if (bMinimum > aMinimum) {
		aMinimum = bMinimum;
	}

	if (bMaximum < aMaximum) {
		aMaximum = bMaximum;
	}

	if (aMaximum <= aMinimum) {
		return false;
	}

	// Vertical
	aMinimum = a.y;
	aMaximum = aMinimum + a.h;
	bMinimum = b.y;
	bMaximum = bMinimum + b.h;

	if (bMinimum > aMinimum) {
		aMinimum = bMinimum;
	}

	if (bMaximum < aMaximum) {
		aMaximum = bMaximum;
	}

	if (aMaximum <= aMinimum) {
		return false; 
	}

	return true;
}

// Create a set of collidables for the entire game state
const forState = (state) => {
	return [
		create(state.paddle[0]),
		create(state.paddle[1]),
		create(state.ball),
	]
};

module.exports = {
	isOverlap,
	forState 
};