/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  _links: [],
  getLength() {
    return this._links.length;
  },
  addLink(value) {
    this._links.push(value !== undefined ? value : '');
    return this;
  },
  removeLink(position) {
    if (isNaN(position) || position < 1 || position > this._links.length - 1) {
      this._links.length = 0;
      throw new Error('You can\'t remove incorrect link!');
    }

    this._links.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this._links.reverse();
    return this;
  },
  finishChain() {
    const chain = this._links.map(l => `( ${l} )`).join('~~');
    this._links.length = 0;
    return chain;
  }
};

module.exports = {
  chainMaker
};
