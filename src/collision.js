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

module.exports = {
	step
};