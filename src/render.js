const xScale = 2;
const xOffset = 50;

const yScale = 2;
const yOffset = 50;

const renderX = (x) => {
	return (x + xOffset) * xScale;
}

const renderY = (y) => {
	return (y + yOffset) * yScale;
}

const renderWidth = (w) => {
	return w * xScale;
};

const renderHeight = (h) => {
	return h * yScale;
};

const renderCollision = (state, context) => {

	context.strokeStyle = 'red';
	context.strokeWidth = 1;

	state.collisions.hulls.forEach(c => {
		context.beginPath();
		context.rect(renderX(c.x), renderY(c.y), renderWidth(c.w), renderHeight(c.h))
		context.stroke();
	});

	context.strokeStyle = 'blue';

	state.collisions.detected.forEach(c => {
		context.beginPath();
		context.rect(renderX(c.intersection.x), renderY(c.intersection.y), renderWidth(c.intersection.w), renderHeight(c.intersection.h))
		context.stroke();
	});
}

const render = (state, context, viewWidth, viewHeight) => {

	context.fillStyle = 'black';

	context.fillRect(renderX(state.ball.pos.x), renderY(state.ball.pos.y), renderWidth(state.ball.size.x), renderHeight(state.ball.size.y));

	state.paddle.forEach(p => {
		context.fillRect(renderX(p.pos.x), renderY(p.pos.y), renderWidth(p.size.x), renderHeight(p.size.y));
	});

	renderCollision(state, context);
};


module.exports = render;