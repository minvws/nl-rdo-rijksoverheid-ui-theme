module.exports = {
	syntax: require("postcss-scss"),
	plugins: [require("@csstools/postcss-sass"), require("cssnano")],
};
