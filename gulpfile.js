'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var ghpages = require('gulp-gh-pages');
var soynode = require('gulp-soynode');
var ssg = require('metal-ssg');

var runSequence = require('run-sequence').use(gulp);

ssg.registerTasks({
	gulp: gulp,
	taskPrefix: 'ssg:'
});

gulp.task('connect', function() {
	connect.server({
		port: 8888,
		root: 'dist'
	});
});

gulp.task('cname', function() {
	return gulp.src('src/CNAME')
		.pipe(gulp.dest('dist'));
});

gulp.task('container', function() {
	return gulp.src('src/container.json')
		.pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['cname', 'container', 'build'], function() {
	return gulp.src('dist/**/*')
		.pipe(ghpages({
			branch: 'wedeploy'
		}));
});

gulp.task('downloads', function() {
	return gulp.src('src/downloads/**')
		.pipe(gulp.dest('dist/downloads'));
});

gulp.task('images', function() {
	return gulp.src('src/images/**')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function() {
	return gulp.src('src/scripts/**')
		.pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', function() {
	return gulp.src('src/styles/*.scss')
		.pipe(compass({
			css: 'dist/styles',
			sass: 'src/styles',
			image: 'dist/images'
		}))
		.pipe(gulp.dest('dist/styles'));
});

gulp.task('vendor', function() {
	return gulp.src('src/vendor/**')
		.pipe(gulp.dest('dist/vendor'));
});

gulp.task('watch', function () {
	gulp.watch('src/downloads/**', ['downloads']);
	gulp.watch('src/images/**', ['images']);
	gulp.watch('src/scripts/**', ['scripts']);
	gulp.watch('src/vendor/**', ['vendor']);
	gulp.watch('src/styles/*.scss', ['styles']);
	gulp.watch('src/**/*.+(soy|md|fm)', function() {
		runSequence('ssg:front-matter', 'ssg:soyweb');
	});
});

gulp.task('build', function(cb) {
	runSequence('ssg:front-matter', 'ssg:soyweb', 'images', 'downloads', 'scripts', 'vendor', 'styles', cb);
});

gulp.task('default', ['build', 'connect', 'watch']);
