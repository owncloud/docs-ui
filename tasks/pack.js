'use strict'

const gulp = require('gulp')
const zip = require('gulp-zip').default

module.exports = (src, dest, bundleName) => new Promise((resolve, reject) => {
  gulp
    .src('**/*', { base: src, cwd: src })
    .pipe(zip(`${bundleName}-bundle.zip`))
    .pipe(gulp.dest(dest)).on('end', function() {
      console.log('Zip bundle created at', `${dest}/${bundleName}-bundle.zip`)
      resolve()
    })
    .on('error', function(err) {
      console.error('Pack error:', err)
      reject(err)
    })
})
