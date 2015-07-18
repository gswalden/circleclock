var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var less        = require('gulp-less');
var minifyCSS   = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var jade        = require('gulp-jade');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var jshint      = require('gulp-jshint');

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('less', function() {
  return gulp.src('css/src/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('css/dist'))
    .pipe(reload({ stream: true }))
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('js', function() {
  return gulp.src('js/src/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('js/dist'))
    .pipe(reload({ stream: true }))
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('jade', function() {
  return gulp.src('jade/index.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(''))
    .pipe(reload({ stream: true }))
    .pipe(notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

// Default task to be run with `gulp`
gulp.task('default', ['jade', 'less', 'browser-sync'], function() {
  gulp.watch('css/src/*.less', ['less']);
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('js/src/*.js', ['js']);
});
