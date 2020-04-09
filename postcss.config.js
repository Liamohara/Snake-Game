module.exports = {
	extract: true,
	sourceMap: false,
	parser: "postcss-scss",
	plugins: [require("@csstools/postcss-sass")(), require("postcss-csso")]
}
