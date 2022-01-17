"use strict";

module.exports = (collection, value, startIndex, options) => {
  if (typeof startIndex === "object") {
    options = startIndex;
    startIndex = undefined;
  }
  return contains(collection, value, startIndex);
};

function contains(val, obj, start) {
  if (val == null || obj == null || isNaN(val.length)) {
    return false;
  }
  return val.indexOf(obj, start) !== -1;
}
