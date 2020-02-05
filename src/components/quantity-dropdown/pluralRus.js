// https://gist.github.com/tomfun/830fa6d8030d16007bbab50a5b21ef97
// function for plurals in Russian language, takes a count and all three word forms
// e.g. getNoun(3, 'яблоко', 'яблока', 'яблок') returns 'яблока'

function getPluralNoun (number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
}

export default getPluralNoun;
