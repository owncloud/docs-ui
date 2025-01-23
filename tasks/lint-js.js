'use strict'

const gulp = require('gulp')
const eslint = require('gulp-eslint-new')

module.exports = (files) =>
  gulp
    .src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
