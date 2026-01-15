'use strict'

const autoprefixer = require('autoprefixer')
const browserify = require('browserify')
const buffer = require('vinyl-buffer')
const cssnano = require('cssnano')
const concat = require('gulp-concat')
const fs = require('fs')
const gulp = require('gulp')
const log = require('fancy-log')
const map = require('map-stream')
const mkdirp = require('mkdirp')
const ordered = require('ordered-read-streams')
const path = require('path')
const postcss = require('gulp-postcss')
const postcssCalc = require('postcss-calc')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')
const postcssVar = require('postcss-custom-properties')
const svgo = require('gulp-svgo')
const terser = require('gulp-terser')

// collect all files and folders to create a bundle that will be zipped in the pack step
module.exports = (src, dest) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dest)) {
      mkdirp.sync(dest)
    }
    if (!fs.existsSync(`${src}/static`)) {
      mkdirp.sync(`${src}/static`)
    }

    const opts = { base: src, cwd: src }
    const postcssPlugins = [
      postcssImport(),
      postcssUrl([
        {
          filter: '**/~typeface-*/files/*',
          url: (asset) => {
            const relpath = asset.pathname.substring(1)
            const abspath = path.resolve('node_modules', relpath)
            const basename = path.basename(abspath)
            const destpath = path.join(dest, 'font', basename)
            if (!fs.existsSync(destpath)) {
              const dirname = path.dirname(destpath)
              if (!fs.existsSync(dirname)) {
                mkdirp.sync(dirname)
              }
              fs.copyFileSync(abspath, destpath)
            }
            return path.join('..', 'font', basename)
          }
        }
      ]),
      postcssVar(),
      postcssCalc(),
      autoprefixer(),
      cssnano({ preset: 'default' })
    ]

    let m = ordered([
      gulp
        .src('js/+([0-9])-*.js', opts)
        .pipe(terser())
        .pipe(concat('js/site.js')),

      gulp
        .src('js/vendor/*.js', Object.assign({ read: false }, opts))
        .pipe(
          // see https://gulpjs.org/recipes/browserify-multiple-destination.html
          map((file, next) => {
            file.contents = browserify(file.relative, {
              basedir: src,
              detectGlobals: false
            }).bundle()
            next(null, file)
          })
        )
        .pipe(buffer())
        .pipe(terser()),

      gulp.src('css/site.css', opts).pipe(postcss(postcssPlugins)),

      gulp.src('font/*.woff*(2)', Object.assign({ allowEmpty: true }, opts)),

      gulp.src('img/**', opts).pipe(svgo()),

      gulp.src('helpers/*.js', opts),

      gulp.src('layouts/*.hbs', opts),

      gulp.src('partials/*.hbs', opts),

      // encoding: false == avoid any transcoding, and effectively just pass around raw binary data.
      // if omitted, mage files such as .png will be transcoded and become useless
      gulp.src('static/**/*', { ...opts, base: path.join(src, 'static'), dot: true, encoding: false }),

      gulp.src('ui.yml', { ...opts, allowEmpty: true })

    ])

    m.pipe(gulp.dest(dest))
      .on('end', function () {
        log('Built sources written to:', `${dest}`)
        resolve()
      })
      .on('error', function (err) {
        log('Build error:', err)
        reject(err)
      })
  })
}
