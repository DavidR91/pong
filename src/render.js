const collidables = require("./collidables");

const xScale = 4;
const yScale = 6;

const renderCollision = (state, context) => {

	context.strokeStyle = 'red';
	context.strokeWidth = 6;

	collidables.forState(state).forEach(c => {
		context.beginPath();
		context.rect(c.x * xScale, c.y * yScale, c.w * xScale, c.h * yScale)
		context.stroke();
	});
}

const render = (state, context, viewWidth, viewHeight) => {

	context.fillStyle = 'black';

	context.fillRect(state.ball.pos.x * xScale, state.ball.pos.y * yScale, state.ball.size.x * xScale, state.ball.size.y * yScale);

	state.paddle.forEach(p => {
		context.fillRect(p.pos.x * xScale, p.pos.y * yScale, p.size.x * xScale, p.size.y * yScale);
	});

	//renderCollision(state, context);
};


module.exports = render;