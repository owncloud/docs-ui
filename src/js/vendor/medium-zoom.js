;(function () {
  var Mzm = (window.mzm = require('medium-zoom/dist/medium-zoom.min'))
  // 'span.image img'
  //    css selector that medium-zoom connects for standard images like jpg or png
  // 'div.imageblock img'
  //    css selector that medium-zoom connects for svg images
  // with that, there is no need to define a role in the image for zooming - all images are zoomable !
  Mzm('span.image img, div.imageblock img', { background: '#fff', margin: 10 })
})()
