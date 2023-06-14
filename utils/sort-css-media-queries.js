const minMaxWidth =
  /(!?\(\s*min(-device)?-width)(.|\n)+\(\s*max(-device)?-width|\(\s*width\s*>(=)?(.|\n)+\(\s*width\s*<(=)?|(!?\(.*<(=)?\s*width\s*<(=)?)/i;
const minWidth = /\(\s*min(-device)?-width|\(\s*width\s*>(=)?/i;
const maxMinWidth =
  /(!?\(\s*max(-device)?-width)(.|\n)+\(\s*min(-device)?-width|\(\s*width\s*<(=)?(.|\n)+\(\s*width\s*>(=)?|(!?\(.*>(=)?\s*width\s*>(=)?)/i;
const maxWidth = /\(\s*max(-device)?-width|\(\s*width\s*<(=)?/i;

const isMinWidth = _testQuery(minMaxWidth, maxMinWidth, minWidth);
const isMaxWidth = _testQuery(maxMinWidth, minMaxWidth, maxWidth);

const minMaxHeight =
  /(!?\(\s*min(-device)?-height)(.|\n)+\(\s*max(-device)?-height|\(\s*height\s*>(=)?(.|\n)+\(\s*height\s*<(=)?|(!?\(.*<(=)?\s*height\s*<(=)?)/i;
const minHeight = /\(\s*min(-device)?-height|\(\s*height\s*>(=)?/i;
const maxMinHeight =
  /(!?\(\s*max(-device)?-height)(.|\n)+\(\s*min(-device)?-height|\(\s*height\s*<(=)?(.|\n)+\(\s*height\s*>(=)?|(!?\(.*>(=)?\s*height\s*>(=)?)/i;
const maxHeight = /\(\s*max(-device)?-height|\(\s*height\s*<(=)?/i;

const isMinHeight = _testQuery(minMaxHeight, maxMinHeight, minHeight);
const isMaxHeight = _testQuery(maxMinHeight, minMaxHeight, maxHeight);

const maxValue = Number.MAX_VALUE;

export const MOBILE_FIRST = "mobile-first";
export const DESKTOP_FIRST = "desktop-first";

function _getQueryLength(query) {
  let length = /(-?\d*\.?\d+)(ch|em|ex|px|rem)/.exec(query);

  if (length === null && (isMinWidth(query) || isMinHeight(query))) {
    length = /(\d)/.exec(query);
  }

  if (length === "0") {
    return 0;
  }

  if (length === null) {
    return maxValue;
  }

  let number = length[1];
  const unit = length[2];

  switch (unit) {
    case "ch":
      number = parseFloat(number) * 8.8984375;
      break;

    case "em":
    case "rem":
      number = parseFloat(number) * 16;
      break;

    case "ex":
      number = parseFloat(number) * 8.296875;
      break;

    case "px":
      number = parseFloat(number);
      break;
  }

  return +number;
}

function _testQuery(doubleTestTrue, doubleTestFalse, singleTest) {
  return function (query) {
    if (doubleTestTrue.test(query)) {
      return true;
    } else if (doubleTestFalse.test(query)) {
      return false;
    }
    return singleTest.test(query);
  };
}

export const createCompareFn = (strategy) => (a, b) => {
  const isMobileFirst = strategy === MOBILE_FIRST;

  const minA = isMinWidth(a) || isMinHeight(a);
  const maxA = isMaxWidth(a) || isMaxHeight(a);

  const minB = isMinWidth(b) || isMinHeight(b);
  const maxB = isMaxWidth(b) || isMaxHeight(b);

  if (minA && maxB) {
    return isMobileFirst ? -1 : 1;
  }
  if (maxA && minB) {
    return isMobileFirst ? 1 : -1;
  }

  const lengthA = _getQueryLength(a);
  const lengthB = _getQueryLength(b);

  if (lengthA === maxValue && lengthB === maxValue) {
    return a.localeCompare(b);
  } else if (lengthA === maxValue) {
    return 1;
  } else if (lengthB === maxValue) {
    return -1;
  }

  if (lengthA > lengthB) {
    if (maxA) {
      return -1;
    }
    return 1;
  }

  if (lengthA < lengthB) {
    if (maxA) {
      return 1;
    }
    return -1;
  }

  return isMobileFirst ? a.localeCompare(b) : -a.localeCompare(b);
};
