'use strict'

// chokidar starting with v5 is now ESM that needs to be embedded differently
const { chokidar } = require('chokidar')
const connect = require('gulp-connect')


module.exports = (serveDir, opts) => {
  let wts
  if (opts) {
    opts = Object.assign({}, opts)
    wts = opts.wts
    delete opts.wts
  } else {
    opts = {}
  }

  let onStart
  if (wts && wts.src && wts.onChange) {
    onStart = () => {
      const watcher = chokidar.watch(wts.src, { ignoreInitial: true })
      watcher
        .on('add', wts.onChange)
        .on('change', wts.onChange)
        .on('unlink', wts.onChange)
    }
  }

  opts.root = serveDir
  connect.server(opts, onStart)
}
