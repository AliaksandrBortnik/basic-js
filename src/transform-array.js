/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('\'arr\' parameter must be an instance of the Array!');
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    switch (item) {
      case '--discard-next':
        i++;
        break;
      case '--discard-prev':
        // Does not allow to discard already discarded item
        arr[i - 2] !== '--discard-next' && result.pop();
        break;
      case '--double-next':
        const itemNext = arr[i + 1];
        itemNext && result.push(itemNext);
        break;
      case '--double-prev':
        const itemPrev = result[i - 1];
        itemPrev && result.push(itemPrev);
        break;
      default:
        result.push(item);
    }
  }

  return result;
}

module.exports = {
  transform
};
