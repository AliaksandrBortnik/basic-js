/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const result = {};
  const splittedDomains = domains.map(d => d.split('.').reverse());

  for (const fullDomain of splittedDomains) {
    for (let i = 0; i < fullDomain.length; i++) {
      const partDomain = '.' + fullDomain.slice(0, i + 1).join('.');

      result[partDomain] = result.hasOwnProperty(partDomain) ?
        result[partDomain] + 1 :
        1;
    }
  }

  return result;
}

module.exports = {
  getDNSStats
};
