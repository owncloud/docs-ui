'use strict'

const connect = require('gulp-connect')
const del = require('del')
const gulp = require('gulp')
const path = require('path')

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

// lint css files
gulp.task('lint:css', () => lintCss(`${srcDir}/css/**/*.css`))

// lint js files
gulp.task('lint:js', () => lintJs(jsFiles))

// properly format defined js files
// note that this task must be run via 'npx gulp format',
// because any changes need to be committed and merged
gulp.task('format', () => format(jsFiles))

// build the bundle, collects all files and folders
gulp.task('build', () => build(srcDir, destDir))

// pack the created bundle to a zip file
gulp.task('pack', () => pack(destDir, buildDir, bundleName))

// clean up target directories
gulp.task('clean', function () {
  return del([`./${previewSiteDestDir}/**`, `./${buildDir}/**`])
})

// build the preview
gulp.task('build:preview', buildPreview(
  srcDir,
  previewSiteSrcDir,
  previewSiteDestDir,
  connect.reload
))

// serve the built preview
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

// tasks available via npm run

gulp.task('lint', gulp.parallel('lint:css', 'lint:js'))

gulp.task('bundle', gulp.series('clean', 'lint', 'build', 'pack'))

gulp.task('preview', gulp.series('bundle', 'build:preview', 'serve:site'))
