var gulp = require('gulp'),
		gutil = require('gulp-util'),
		jshint = require('gulp-jshint'),
		sass   = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch']
		// function() { // log w gutil.log. useful.....
	// return gutil.log('gulp me baby!');
// }
);

gulp.task('copyHtml', function(){
	gulp.src('source/*.html').pipe(
		gulp.dest('public')
	);
});

gulp.task('jshint', function(){
	return gulp.src('source/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-css', function() {
  return gulp.src('source/scss/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
});

gulp.task('watch', function(){
	gulp.watch('source/javascript/**/*.js', ['jshint']);
	gulp.watch('source/scss/**/*.scss', ['build-css']);
});

