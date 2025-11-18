'use strict'

const Asciidoctor = require('@asciidoctor/core')()
const fs = require('fs')
const handlebars = require('handlebars')
const map = require('map-stream')
const path = require('path')
const { promisify } = require('util')
const requireFromString = require('require-from-string')
const gulp = require('gulp')
const yaml = require('js-yaml')
const ordered = require('ordered-read-streams')
const through2 = require('through2');

const ASCIIDOC_ATTRIBUTES = { experimental: '', icons: 'font', sectanchors: '', 'source-highlighter': 'highlight.js' }

module.exports = (src, siteSrc, siteDest, sink = () => map()) => async (done) => {
  return Promise.all([
    loadSampleUiModel(siteSrc),
    compileLayouts(src),
    registerPartials(src),
    registerHelpers(src)
  ]).then(([baseUiModel, layouts]) => {
    const stream = ordered([
      gulp.src('**/*.html', { base: siteSrc, cwd: siteSrc }).pipe(through2.obj((file, _, next) => {
        const compiledLayout = layouts[file.stem === '404' ? '404.hbs' : 'default.hbs']
        const siteRootPath = path.relative(
          path.dirname(file.path),
          path.resolve(siteSrc)
        )
        baseUiModel.env = process.env
        baseUiModel.siteRootPath = siteRootPath
        baseUiModel.siteRootUrl = path.join(siteRootPath, 'index.html')
        baseUiModel.uiRootPath = path.join(siteRootPath, '_')
        baseUiModel.page.contents = file.contents.toString().trim()
        file.contents = Buffer.from(compiledLayout(baseUiModel))
        next(null, file)
      })),
      gulp
        .src('**/*.adoc', { base: siteSrc, cwd: siteSrc })
        .pipe(through2.obj((file, _, next) => {
          const siteRootPath = path.relative(path.dirname(file.path), path.resolve(siteSrc))
          const uiModel = { ...baseUiModel }
          uiModel.page = { ...uiModel.page }
          uiModel.siteRootPath = siteRootPath
          uiModel.uiRootPath = path.join(siteRootPath, '_')
          if (file.stem === '404') {
            uiModel.page = { layout: '404', title: 'Page Not Found' }
          } else {
            const doc = Asciidoctor.load(file.contents, { safe: 'safe', attributes: ASCIIDOC_ATTRIBUTES })
            uiModel.page.attributes = Object.entries(doc.getAttributes())
              .filter(([name, val]) => name.startsWith('page-'))
              .reduce((accum, [name, val]) => {
                accum[name.slice(5)] = val
                return accum
              }, {})
            uiModel.page.description = doc.getAttribute('description')
            uiModel.page.layout = doc.getAttribute('page-layout', 'default')
            uiModel.page.title = doc.getDocumentTitle()
            uiModel.page.contents = Buffer.from(doc.convert())
          }
          file.extname = '.html'
          try {
            const layoutName = uiModel.page.layout.endsWith('.hbs') ? uiModel.page.layout : `${uiModel.page.layout}.hbs`
            file.contents = Buffer.from(layouts[layoutName](uiModel))
            next(null, file)
          } catch (e) {
            next(transformHandlebarsError(e, uiModel.page.layout))
          }
        }))
    ])

    stream.pipe(gulp.dest(siteDest))
      .on('error', done)
      .pipe(sink())
  })
}

function loadSampleUiModel (siteSrc) {
  return promisify(fs.readFile)(
    path.join(siteSrc, 'ui-model.yml'),
    'utf8'
  ).then((contents) => yaml.load(contents))
}

function registerPartials(src) {
  return new Promise((resolve, reject) => {
    gulp
      .src('partials/*.hbs', { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          handlebars.registerPartial(file.stem, file.contents.toString())
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', resolve)
  })
}

function registerHelpers(src) {
  return new Promise((resolve, reject) => {
    gulp
      .src('helpers/*.js', { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          const helperFunction = requireFromString(file.contents.toString())
          handlebars.registerHelper(file.stem, helperFunction)
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', resolve)
  })
}

function compileLayouts(src) {
  const layouts = {}
  return new Promise((resolve, reject) => {
    gulp
      .src('layouts/*.hbs', { base: src, cwd: src })
      .pipe(
        map((file, next) => {
          layouts[file.basename] = handlebars.compile(
            file.contents.toString(),
            { preventIndent: true }
          )
          next(null, file)
        })
      )
      .on('error', reject)
      .on('end', () => resolve(layouts))
  })
}

function transformHandlebarsError ({ message, stack }, layout) {
  const m = stack.match(/^ *at Object\.ret \[as (.+?)\]/m)
  const templatePath = `src/${m ? 'partials/' + m[1] : 'layouts/' + layout}.hbs`
  const err = new Error(`${message}${~message.indexOf('\n') ? '\n^ ' : ' '}in UI template ${templatePath}`)
  err.stack = [err.toString()].concat(stack.slice(message.length + 8)).join('\n')
  return err
}
