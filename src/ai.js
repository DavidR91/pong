import { clamp } from "./math";

// Output the normalized Y input to control the paddle for the AI
//
// This AI is trash 
export default (ballState, lastInput, paddlePos, delta) => {

	let next = lastInput;

	const yDistance = Math.abs(ballState.pos.y - paddlePos.y);
	const xDistance = Math.abs(ballState.pos.x - paddlePos.x);

	if (ballState.pos.y > paddlePos.y && yDistance > ballState.size.y / 4 && xDistance < 50) {
		next += 5 * delta;
	} else {
		if (ballState.pos.y < paddlePos.y && yDistance > ballState.size.y / 4 && xDistance < 50) {
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
