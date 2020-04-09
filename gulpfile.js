const gulp = require("gulp")
const html = require("gulp-htmlmin")
const css = require("gulp-postcss")
const js = require("gulp-terser")

gulp.task("html", () => {
	return gulp.src("html/**/*.html")
		.pipe(html())
		.pipe(gulp.dest("build"))
})

gulp.task("css", () => {
	return gulp.src("sass/**/*.scss")
		.pipe(css())
		.pipe(require("gulp-ext-replace")(".css"))
		.pipe(gulp.dest("build"))
	
})

gulp.task("js", () => {
	return gulp.src("js/**/*.js")
		.pipe(js())
		.pipe(gulp.dest("build"))
})
