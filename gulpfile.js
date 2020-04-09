const gulp = require("gulp")
const html = require("gulp-htmlmin")
const sass = require("gulp-sass")
const js = require("gulp-terser")

gulp.task("html", () => {
	return gulp.src("html/**/*.html")
		.pipe(html())
		.pipe(gulp.dest("build"))
})

gulp.task("css", () => {
	return gulp.src("sass/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("build"))
})

gulp.task("js", () => {
	return gulp.src("js/**/*.js")
		.pipe(js())
		.pipe(gulp.dest("build"))
})
