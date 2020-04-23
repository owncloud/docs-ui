'use strict'

/**
 * This helper determines if the outdated notification should be displayed or
 * not.
 */
module.exports = (latestVersion, pageVersion) => {
  if (!latestVersion || !pageVersion) {
    return false
  }

  if (pageVersion === 'master') {
    return false
  }

  if (pageVersion >= latestVersion) {
    return false
  }

  return true
}
