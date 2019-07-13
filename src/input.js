const empty = () => {

	// Normalized form of the left and right vertical direction change
	return [
		0, 
		0
	]
};

const collect = (state) => {

	let next = empty();

	// For every paddle 
	state.paddle.forEach((p, index) => {

		let controller = navigator.getGamepads()[index];

		if (controller) {
			next[index] = controller.axes[1];
		}
	});

	return next;
};

module.exports = {
	empty, 
	collect
};