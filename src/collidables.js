import { createBorder } from "./border";

// Create a collidable for an object with size and position 
const dynamic = (obj) => {
	return {
		type: obj.type,
		x: obj.pos.x, 
		y: obj.pos.y, 
		w: obj.size.x, 
		h: obj.size.y,
		dir: {...obj.dir},
		isDynamic: true  // Requires dynamic frame for frame collision checks
	}
};

// Is there overlap between two collidables
export const isOverlap = (a, b) => {

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

export const intersection = (a, b) => {

	let result = {
		x: 0, 
		y: 0, 
		w: 0, 
		h: 0
	};

	// Horizontal
	let aMinimum = a.x;
	let aMaximum = aMinimum + a.w;
	let bMinimum = b.x;
	let bMaximum = bMinimum + b.w;

	if (bMinimum > aMinimum) {
		aMinimum = bMinimum;
	}

	result.x = aMinimum;

	if (bMaximum < aMaximum) {
		aMaximum = bMaximum;
	}

	result.w = aMaximum - aMinimum;

	// Vertical
	aMinimum = a.y;
	aMaximum = aMinimum + a.h;
	bMinimum = b.y;
	bMaximum = bMinimum + b.h;

	if (bMinimum > aMinimum) {
		aMinimum = bMinimum;
	}

	result.y = aMinimum;

	if (bMaximum < aMaximum) {
		aMaximum = bMaximum;
	}

	result.h = aMaximum - aMinimum;
 	return result;
}

// Create a set of collidables for the entire game state
export const createCollidables = (state) => {
	return [

		// Horizontals
		createBorder(-25, -10, 154, 10),
		createBorder(-25, 110, 154, 10),

		// Verticals
		createBorder(-25, -10, 10, 130, 0),
		createBorder(119, -10, 10, 130, 1),

		dynamic(state.paddle[0]),
		dynamic(state.paddle[1]),
		dynamic(state.ball),
	]
};