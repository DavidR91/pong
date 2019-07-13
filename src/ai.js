const clamp = (v, min, max) => {
	return Math.min(Math.max(v, min), max)
};

// Output the normalized Y input to the paddle for the AI
const step = (state, lastInput, paddlePos, delta) => {

	let next = lastInput;

	const yDistance = Math.abs(state.ball.pos.y - paddlePos.y);
	const xDistance = Math.abs(state.ball.pos.x - paddlePos.x);

	if (state.ball.pos.y > paddlePos.y && yDistance > state.ball.size.y /2 && xDistance < 50) {
		next += 5 * delta;
	} else {
		if (state.ball.pos.y < paddlePos.y && yDistance > state.ball.size.y /2 && xDistance < 50) {
			next -= 5 * delta;
		} else {
			
			if (next > 0) {
				next -= delta;
			} else {

				if (next < 0) {
					next += delta;
				}
			}

		}
	}

	return clamp(next, -1, 1);
};

module.exports = {
	step
};