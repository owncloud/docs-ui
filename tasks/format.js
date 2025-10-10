'use strict'

const gulp = require('gulp')
const prettier = require('./lib/gulp-prettier-eslint')

// format all js files
module.exports = (files) =>
  gulp
    .src(files)
    .pipe(prettier())
    .pipe(gulp.dest((file) => file.base))
