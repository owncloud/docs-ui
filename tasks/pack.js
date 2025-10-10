'use strict'

const fs = require('fs')
const gulp = require('gulp')
const log = require('fancy-log')
const zip = require('gulp-zip').default

// pack all files and folders to a zip
module.exports = (src, dest, bundleName) =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(src)) {
      log('No sources found to pack, did the bundle task run successfully?')
    }

    gulp
      .src('**/*', { base: src, cwd: src })
      .pipe(zip(`${bundleName}-bundle.zip`))
      .pipe(gulp.dest(dest))
      .on('end', function () {
        log('ZIP bundle created at:', `${dest}/${bundleName}-bundle.zip`)
        resolve()
      })
      .on('error', function (err) {
        console.error('Pack error:', err)
        reject(err)
      })
  })
