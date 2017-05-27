'use strict';

const gulp      = require('gulp')
  , del         = require('del')
  , browserSync = require('browser-sync').create()
  , plugins     = require('gulp-load-plugins')()
  , dest        = './build'
  ;

// browser-sync task for starting the server.
gulp.task('browser-sync', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: dest
    },
    files: dest + '/*'
  });
});

gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('maps'))
    .pipe(gulp.dest(dest))
    .pipe(plugins.notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('jade', function() {
  return gulp.src('jade/index.jade')
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(gulp.dest(dest))
    .pipe(plugins.notify('Finished file: <%= file.relative %>'))
  ;
});

gulp.task('build', ['js', 'jade', 'static']);

gulp.task('del', function() {
  return del.sync(dest);
});

gulp.task('deploy', ['del', 'build'], function() {
  return gulp.src(dest + '/**/*')
    .pipe(plugins.ghPages());
});

gulp.task('static', function () {
  return gulp.src('static/*')
    .pipe(gulp.dest(dest));
});

// Default task to be run with `gulp`
gulp.task('default', ['del', 'browser-sync'], function() {
  gulp.watch('jade/*.jade', ['jade']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('static/*', ['static']);
});
