const gulp = require("gulp");
const html = require("gulp-htmlmin");
const css = require("gulp-postcss");
const js = require("gulp-terser");
const tlpackage = require("./package");
const preamble = `${tlpackage.name} v${
	tlpackage.version
} ©${new Date().getFullYear()} ${tlpackage.author}`;

const htmlMinifyConfig = {
	collapseWhitespace: true,
	caseSensitive: true,
	collapseBooleanAttributes: true,
	processConditionalComments: true,
	removeScriptTypeAttributes: true,
	sortAttributes: true,
	useShortDoctype: true,
	minifyCSS: true,
	removeComments: true,
};
const jsMinifyConfig = {
	compress: {
		unsafe: true,
		passes: 2,
		keep_fargs: false,
		drop_console: false,
		arguments: true,
	},
	mangle: {
		properties: false,
		toplevel: true,
	},
	output: {
		beautify: false,
		preamble: "/* " + preamble + ' */console.log("' + preamble + '");',
		webkit: true,
		comments: false,
	},
};

gulp.task("html", () => {
	return gulp
		.src("html/**/*.html")
		.pipe(html(htmlMinifyConfig))
		.pipe(gulp.dest("build"));
});

gulp.task("css", () => {
	return gulp
		.src("sass/**/*.scss")
		.pipe(css())
		.pipe(require("gulp-ext-replace")(".css"))
		.pipe(gulp.dest("build"));
});

gulp.task("js", () => {
	return gulp
		.src("js/**/*.js")
		.pipe(js(jsMinifyConfig))
		.pipe(gulp.dest("build"));
});
