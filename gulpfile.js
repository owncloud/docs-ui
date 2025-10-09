'use strict'

const connect = require('gulp-connect')
const path = require('path')
const gulp = require('gulp')
const del = require('del')

const build = require('./tasks/build')
const buildPreview = require('./tasks/build-preview')
const format = require('./tasks/format')
const lintCss = require('./tasks/lint-css')
const lintJs = require('./tasks/lint-js')
const pack = require('./tasks/pack')
const preview = require('./tasks/preview')

const bundleName = 'ui'
const buildDir = 'build'
const previewSiteSrcDir = 'preview-site-src'
const previewSiteDestDir = 'public'
const srcDir = 'src'
const destDir = path.join(previewSiteDestDir, '_')

const jsFiles = [
  'gulpfile.js',
  'tasks/**/*.js',
  path.join(srcDir, '{helpers,js}/**/*.js')
]

gulp.task('clean', function () {
  return del(['./public/**', './build/**'])
})

gulp.task('lint:css', () => lintCss(`${srcDir}/css/**/*.css`))
gulp.task('lint:js', () => lintJs(jsFiles))
gulp.task('lint', gulp.parallel('lint:css', 'lint:js'))

gulp.task('format', () => format(jsFiles))

//gulp.task('bundle', () => pack(destDir, buildDir, bundleName))
gulp.task('bundle', async (done) => {
  await pack(destDir, buildDir, bundleName)
  done()
  console.log('end')
})

//gulp.task('build', () => build(srcDir, destDir))
gulp.task('build', async (done) => {
  await build(srcDir, destDir)
  done()
  console.log('xxx')
})

gulp.task('build:preview', async (done) => {
  await buildPreview(
    srcDir,
    destDir,
    previewSiteSrcDir,
    previewSiteDestDir,
    connect.reload
  )
  done()
})

gulp.task('serve:site', async (done) => {
  await preview(previewSiteDestDir, {
    host: '0.0.0.0',
    port: 5252,
    livereload: process.env.LIVERELOAD === 'true',
    watch: {
      src: [srcDir, previewSiteSrcDir],
      onChange: () => gulp.start('build:preview')
    }
  })
  done()
})

gulp.task('pack', gulp.series('clean', 'lint', 'build', 'bundle'))

gulp.task('preview', gulp.series('pack', 'build:preview', 'serve:site'))

//gulp.task('default', gulp.series('build'))
gulp.task('default', gulp.series('bundle'))
