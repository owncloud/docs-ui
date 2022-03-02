;(function () {
  'use strict'

// Additional keywords to be highlighted when using the bash language
// Note that with version 9 of highlight.js, many keywords are missing compared to v10+
const kwds_bash =
'occ apt apt-get diff cat chown chmod dpkg exec mkdir systemctl sed service sudo ssh touch ' +
'docker docker-compose find grep make mysql openssl pecl pear php rsync tar wget ' + 
'a2ensite a2dissite a2enmod a2dismod phpdismod phpenmod';

// var hljs = (window.hljs = require('highlight.js/lib/core'))
var hljs = require('highlight.js/lib/highlight')
  hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'))
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'))
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  hljs.registerLanguage('clojure', require('highlight.js/lib/languages/clojure'))
  hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
  hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
  hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'))
  hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'))
  hljs.registerLanguage('elixir', require('highlight.js/lib/languages/elixir'))
  hljs.registerLanguage('go', require('highlight.js/lib/languages/go'))
  hljs.registerLanguage('groovy', require('highlight.js/lib/languages/groovy'))
  hljs.registerLanguage('haskell', require('highlight.js/lib/languages/haskell'))
  hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'))
  hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
  hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
  hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
  hljs.registerLanguage('kotlin', require('highlight.js/lib/languages/kotlin'))
  hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
  hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
  hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
  hljs.registerLanguage('nix', require('highlight.js/lib/languages/nix'))
  hljs.registerLanguage('objectivec', require('highlight.js/lib/languages/objectivec'))
  hljs.registerLanguage('perl', require('highlight.js/lib/languages/perl'))
  hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
  hljs.registerLanguage('properties', require('highlight.js/lib/languages/properties'))
  hljs.registerLanguage('puppet', require('highlight.js/lib/languages/puppet'))
  hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
  hljs.registerLanguage('ruby', require('highlight.js/lib/languages/ruby'))
  hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'))
  hljs.registerLanguage('scala', require('highlight.js/lib/languages/scala'))
  hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
  hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
  hljs.registerLanguage('swift', require('highlight.js/lib/languages/swift'))
  hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
  hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'))

/* Add additional keywords to the bash language
 * Derived from: https://github.com/highlightjs/highlight.js/wiki/Adding-keywords-to-a-language-at-runtime
 * Note that this is a special version for of highlight.js 9.x which uses strings instead of an array
 * Layout used and defined in highlight.css at .hljs-built_in
*/
  hljs.getLanguage('bash').keywords.built_in += ' ' + kwds_bash;
  // console.log(hljs.getLanguage('bash').keywords.built_in);

/* Do the same pattern matching as with version 11 of highlight.js
 * See: https://github.com/highlightjs/highlight.js/pull/3494
*/
  hljs.getLanguage('bash').lexemes = /\b[a-z][a-z0-9._-]+\b/;
  // console.log(hljs.getLanguage('bash').lexemes);

  ;[].slice.call(document.querySelectorAll('pre code.hljs')).forEach(function (node) {
    hljs.highlightBlock(node)
  })
})()
