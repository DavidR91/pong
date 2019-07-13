const clamp = (v, min, max) => {
	return Math.min(Math.max(v, min), max)
};

module.exports = {
	clamp
};