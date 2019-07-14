const paddleType = Symbol("paddle");
import vec from "./vec";

export const createPaddle = (x, y, ai = false) => {
	return {
		type: paddleType,
		pos: vec(x, y),
		size: vec(6, 12),
		dir: vec(0, 0),
		speed: 8, 
		isAi: ai
	};
};
