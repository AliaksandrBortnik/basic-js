/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (!str) return str;

  let result = '';
  let charCount = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      charCount++;
    } else {
      const prefixCount = charCount > 1 ? charCount : '';
      result += prefixCount + str[i];
      charCount = 1;
    }
  }

  return result;
}

module.exports = {
  encodeLine
};
