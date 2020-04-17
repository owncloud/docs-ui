'use strict'

/**
 * This helper returns the URL of the current page in the latest version of the
 * documentation, if it is in an outdated version of the documentation.
 */
module.exports = (pageUrl, latestVersion, currentVersion) => {
  return (pageUrl.indexOf(currentVersion) !== -1)
    ? pageUrl.replace(currentVersion, latestVersion)
    : pageUrl
}
