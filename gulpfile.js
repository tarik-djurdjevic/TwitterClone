///////////////////////////////////////////
// Required
//////////////////////////////////////////

var gulp=require('gulp'),
	uglify=require('gulp-uglify'),
	rename=require('gulp-rename'),
	plumber=require('gulp-plumber'),
	browserSync=require('browser-sync').create(),
	reload=browserSync.reload,
	nodemon=require('gulp-nodemon'),
	minify=require('gulp-minify-css');

///////////////////////////////////////////
// HTML Task
//////////////////////////////////////////

gulp.task('html',function(){
	gulp.src('./client/**/*.html')
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Scripts Task
//////////////////////////////////////////

gulp.task('scripts',function(){
	gulp.src(['./client/**/*.js','!client/**/*min.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('./client/'))
		.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Styles Task
//////////////////////////////////////////

gulp.task('styles',function(){
	gulp.src(['./client/styles/*.css','!client/styles/*min.css'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
		.pipe(minify())
		.pipe(gulp.dest('./client/styles/'))
		.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Browser-Sync Task
//////////////////////////////////////////

gulp.task('browser-sync',['nodemon'], function() {
    browserSync.init({
        proxy: "http://localhost:3000",
        files: ['./client'],
        browser:['chrome.exe','firefox.exe'],
        port: 4000
    });
});
///////////////////////////////////////////
// start nodemon Task
//////////////////////////////////////////

gulp.task('nodemon',[], function (cb) {
	
	var started = false;
	
	return nodemon({
		script: './server/server.js',
		watch:['./*.*']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
		} 
		started = true; 
	}).on('restart',function(){
		seTimeout(function(){
			reload();
		},200);
	});
});

///////////////////////////////////////////
// Watch Tasks
//////////////////////////////////////////

gulp.task('watch',function(){
	gulp.watch('./client/**/*.js',['scripts']);
	gulp.watch('./client/styles/*.css',['styles']);
	gulp.watch('./client/**/*.html',['html']);
});

///////////////////////////////////////////
// Default Task
//////////////////////////////////////////

gulp.task('default',['browser-sync','watch']);