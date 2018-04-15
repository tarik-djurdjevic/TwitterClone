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
	concat=require('gulp-concat'),
	minify=require('gulp-minify-css');

///////////////////////////////////////////
// HTML Task
//////////////////////////////////////////

gulp.task('html',function(){
	return gulp.src('./client/**/*.html')
	.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Scripts Task - concat and uglify
//////////////////////////////////////////

gulp.task('scripts',function(){
	return gulp.src(['./client/**/*.js','!client/**/*min.js','!client/helpers/*.js','!client/builds/*'])
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./client/builds',{overwrite: true}))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./client/builds'))
		.pipe(reload({stream:true}));
});

///////////////////////////////////////////
// Styles Task - concat and minify
//////////////////////////////////////////

gulp.task('styles',function(){
	return gulp.src(['./client/styles/*.css','!client/styles/*min.css','!client/builds/*'])
		.pipe(plumber())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./client/builds',{overwrite: true}))
		.pipe(rename('styles.min.css'))
		.pipe(minify())
		.pipe(gulp.dest('./client/builds'))
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
		script: './server/bin/www',
		watch:['./*.*']
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
		} 
		started = true; 
	}).on('restart',function(){
		setTimeout(function(){
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