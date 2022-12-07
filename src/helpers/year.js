/*!
 * Prints the actual year
 * Usage: {{year "yyyy"}} or {{year "yy"}}
 */

/*!
 * The following is derived from:
 * helper-year <https://github.com/jonschlinkert/helper-year>
 * year <https://github.com/jonschlinkert/year>
 * Licensed under the MIT license.
 */

'use strict';

module.exports = (pattern) => {
  const year = new Date().getUTCFullYear().toString();

  if (typeof pattern !== 'string') {
    return year;
  }

  if (/[Yy]{4}/.test(pattern)) {
    return year;
  }

  if (/[Yy]{2}/.test(pattern)) {
    return year.substr(2, 2);
  }
};
