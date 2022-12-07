/* do not overwrite or replace this content with the one of the default ui as it will break the navigation */
/* https://gitlab.com/mmattel/antora-ui-default/-/blob/master/src/helpers/relativize.js */
/* needs more investigation to fix */
'use strict'

const { posix: path } = require('path')

// TODO memoize
module.exports = (from, to) => {
  if (!from || to.charAt() === "#") return to;
  let hash = "";
  const hashIdx = to.indexOf("#");
  if (~hashIdx) {
    hash = to.substr(hashIdx);
    to = to.substr(0, hashIdx);
  }
  if (from === to) {
    return hash || (isDir(to) ? "./" : path.basename(to));
  } else {
    return (
      path.relative(path.dirname(from + "."), to) +
      (isDir(to) ? "/" + hash : hash)
    );
  }
}
function isDir(str) {
  return str.charAt(str.length - 1) === "/";
}
