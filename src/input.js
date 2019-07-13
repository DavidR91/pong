const clone = require("lodash.clonedeep");

const empty = () => {

	// Normalized form of the left and right vertical direction change
	return [
		0, 
		0
	]
};

const step = (paddles) => {

	return paddles.map((p, index) => {

		let controller = navigator.getGamepads()[index];

		if (controller) {
		 	return controller.axes[1];
		} else {
			return 0;
		}
	});
};

module.exports = {
	empty, 
	step
};