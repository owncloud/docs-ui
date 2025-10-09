'use strict'

const gulp = require('gulp')
const zip = require('gulp-zip')

module.exports = (src, dest, bundleName) =>
  gulp
    .src('**/*', { base: src, cwd: src })
    .pipe(zip(`${bundleName}-bundle.zip`))
    .pipe(gulp.dest(dest)).on('end', function() { console.log('written') })
