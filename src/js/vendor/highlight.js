;(function () {
  'use strict'

// the following are additional keywords to be highlighted, particulary when using bash
const kwds_bash = [
'occ', 'ocis',
'apt', 'apt-get', 'curl', 'diff', 'dpkg', 'find', 'grep', 'install',
'make', 'mysql', 'openssl', 'pear', 'pecl', 'php', 'rsync',
'service', 'systemctl', 'ssl', 'ssh', 'sudo', 'tar', 'wget',
'yum', 'zypper',
'phpenmod', 'phpdismod', 'a2enmod', 'a2dismod', 'a2ensite', 'a2dissite'
];

const kwds_docker = [
'docker', 'docker-compose'
];

const kwds_kubernetes = [
'minikube', 'kubectl', 'helm', 'start', 'addons' , 'apply'
];

var hljs = (window.hljs = require('highlight.js/lib/core'))
  hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'))
  hljs.registerLanguage('asciidoc', require('highlight.js/lib/languages/asciidoc'))
  hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
  hljs.registerLanguage('clojure', require('highlight.js/lib/languages/clojure'))
  hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'))
  hljs.registerLanguage('csharp', require('highlight.js/lib/languages/csharp'))
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
  hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'))
  hljs.registerLanguage('powershell', require('highlight.js/lib/languages/powershell'))
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

/* Add the additional keywords to languages
 * References: https://github.com/highlightjs/highlight.js/wiki/Adding-keywords-to-a-language-at-runtime
 * Layout used and defined in highlight.css at .hljs-built_in
*/
  hljs.getLanguage('bash').keywords.built_in.push(...kwds_bash);
  hljs.getLanguage('bash').keywords.built_in.push(...kwds_kubernetes);
  hljs.getLanguage('dockerfile').keywords.push(...kwds_docker);
  // console.log(hljs.getLanguage('bash').keywords);

/* To eliminate the security messages in the browser telling:
 * "One of your code blocks includes unescaped HTML. This is a potentially serious security risk"
 * See: https://github.com/highlightjs/highlight.js/wiki/security
 * A hljs.configure command to ignore the message can either be added in partials/footer-scripts.hbs or here
 * hljs.configure({ ignoreUnescapedHTML: true })
 * For details see: https://github.com/owncloud/docs-ui/pull/438#issuecomment-1057878336
*/
  hljs.configure({ ignoreUnescapedHTML: true })

  hljs.highlightAll();

  ;[].slice.call(document.querySelectorAll('pre code.hljs')).forEach(function (node) {
    hljs.highlightElement(node)
  })
})()
