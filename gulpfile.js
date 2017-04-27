var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	fileinclude = require('gulp-file-include'),
	clean = require('gulp-clean'),
	runSequence = require('run-sequence'),
	browserSync = require('browser-sync').create();

//clean dist
gulp.task('clean-dist', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

// Sass - compiles SCSS and prefixes CSS and streams CSS to browserSync
gulp.task('sass', function() {

	return gulp.src('./src/scss/*.scss')

		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer()) // in case of something not working change to 'last 10 versions'
		.pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream()); 

});

//contect js files
gulp.task("concat", function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dist/js/'))
}) 

//html include
gulp.task("fileinclude", function() {
  gulp.src(['src/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'));
})

// Watch
gulp.task('watch', function() {

	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/**/*.html', ['fileinclude']);
	gulp.watch('src/js/*.js', ['concat']);

});


// BrowserSync
gulp.task('serve', function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/**/*.html").on('change', browserSync.reload);
});

// Copy - images - Copies images
gulp.task('copy:images', function() {

	return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
		.pipe(gulp.dest('dist/img'));

});

// Copy - JS Vendors
gulp.task('copy:jsvendors', function() {

	return gulp.src('src/js/vendors/*.js')
		.pipe(gulp.dest('dist/js/vendors'));

});

// Build
gulp.task('build', function() {

	runSequence('copy:images', 'copy:jsvendors');

});


// Default
gulp.task('default', function() {

	runSequence('clean-dist', 'sass', 'concat', 'fileinclude', 'watch', 'serve', 'build');

});

