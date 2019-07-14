import { createCollidables, intersection, isOverlap } from "./collidables";
const clone = require("lodash.clonedeep");

// Produce the set of all collisions
export default (state) => {

	let hulls = createCollidables(state);

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

			if (isOverlap(h, other)) {
				results.detected.push({
					a: h, 
					b: other,
					intersection: intersection(h, other)
				});
			}

		});

	});

	return results;
};
