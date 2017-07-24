'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const webpack = require('gulp-webpack');
const del = require('del');
const newer = require('gulp-newer');
const watch = require('gulp-watch');
const nodemon = require('gulp-nodemon');
const changed = require('gulp-changed');

gulp.task('clean', function () {
  return del(['build/']);
});

gulp.task('copy-server', function () {
  return gulp.src('server/**/*.js')
    .pipe(newer('build/server'))
    .pipe(gulp.dest('build/server'));
});

gulp.task('html', function() {
  return gulp.src('client/index.html', {since: gulp.lastRun('html')})
    .pipe(newer('build/client'))
    .pipe(gulp.dest('build/client'));
});

gulp.task('react', function () {
  return gulp.src('client/jsx/**/*.jsx')
    .pipe(changed('client/js', {extension: '.js'}))
    .pipe(babel({
        plugins: ['transform-react-jsx']
    }))
    .pipe(gulp.dest('client/js'));
});


gulp.task('scripts', function () {
  return gulp.src('./client/js/main.js')
    .pipe(plumber())
    .pipe(webpack({
      devtool: 'source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      },
      output: {
          filename: "main.js"
      }
    }))
    .pipe(gulp.dest('./build/client/js'));
});

gulp.task('build', gulp.series('clean', 'html', 'copy-server', 'react', 'scripts'));

gulp.task('watch', function() {
  gulp.watch('server/**/*.js', gulp.series('copy-server'));
  gulp.watch('client/jsx/**/*.jsx', gulp.series('react'));
  gulp.watch('client/js/**/*.js', gulp.series('scripts'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'build/server/app.js',
    watch: 'build/*',
    ext: 'js html'
  });
});

gulp.task('dev',
  gulp.series('build',
    gulp.parallel('watch', 'nodemon')));
