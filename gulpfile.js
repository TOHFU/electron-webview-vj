var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

var config = require('./config').sass;

// live reload
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    },
    files: ['./**/*.html']
  });
});

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(concat(config.output))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulpif(config.minify, minify()))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function () {
  return watch('./src/scss/**/*', function () {
    return gulp.start(['sass']);
  });
});

gulp.task('default', ['sass', 'browser-sync', 'watch']);
