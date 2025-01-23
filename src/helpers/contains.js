'use strict'

module.exports = (needle, haystack, options) => {
// searches for a needle in haystack
// mandatory arguments are needle and haystack
// optional named arguments like "startIndex" and "word" are in options.hash.name
// startIndex is only for indexOf
// word is only to go for whole words. blanks and commas separates words (regex \b)
// word just needs to have a value which is converted to true (set) or false (absent)

  let startIndex
  let word = false

  if (typeof options.hash.startIndex !== 'undefined') {
    startIndex = options.hash.startIndex
    if (!Number.isInteger(startIndex)) {
      startIndex = undefined
    }
  }
  if (typeof options.hash.word !== 'undefined') {
    word = options.hash.word
  }

  return contains(needle, haystack, startIndex, word)
}

function contains (needle, haystack, startIndex, word) {
  if (needle == null || haystack == null || isNaN(needle.length)) {
    return false
  }

  if (word) {
    const regex = new RegExp('\\b' + needle + '\\b', 'g')
    // no matches gives you null, which is converted to false
    // one or more matches gives you an array, which is converted to true
    return !!haystack.match(regex)
  } else {
    return haystack.indexOf(needle, startIndex) !== -1
  }
}
