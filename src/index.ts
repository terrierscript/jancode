/**
 * Calculate check digit from JAN code, which is 13 digit format
 * https://www.dsri.jp/jan/check_digit.html
 * @param code 
 */
const getCheckDigit = (code:String) => {
  const reversed = code.split('').reverse();
  const [even, odd] = reversed.reduce((prev, current, index) => {
    const num = parseInt(current)
    if (index % 2 === 0) {
      prev[0] += num;
    } else {
      prev[1] += num
    }

    return prev;
  }, [0, 0]);

  const total = even * 3 + odd;

  return (10 - parseInt(total.toString(10).slice(-1))).toString(10);
};


/**
 * Create JAN code from any publication date.
 * https://www.dsri.jp/code/jan_periodical_publication/
 * https://ja.wikipedia.org/wiki/%E9%9B%91%E8%AA%8C%E3%82%B3%E3%83%BC%E3%83%89#%E5%AE%9A%E6%9C%9F%E5%88%8A%E8%A1%8C%E7%89%A9%E3%82%B3%E3%83%BC%E3%83%89
 * 
 * @param periodicPublicationCode 
 * @param year 
 * @param month 
 */
const create = (periodicPublicationCode: String, year: Number, month: Number) => {
  const flag = 491
  const reserved = 0
  const yearLastDigit = year.toString(10).slice(-1)
  const _month = ('00' + month).slice(-2)
  const fragment = `${flag}${reserved}${periodicPublicationCode}${_month}${yearLastDigit}`;
  const checkDigit = getCheckDigit(fragment);

  return `${fragment}${checkDigit}`;
};

/**
 * Extract periodical publication code from JAN code.
 * @param janCode 
 */
const getPeriodicalPublicationCode = (janCode:String) => {
  const match = janCode.match(/^4910(\d{5})\d+$/);
  return (match && match.length > 1) ? match[1] : null;
};

export {
  create,
  getPeriodicalPublicationCode
};
