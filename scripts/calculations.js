export const calcRatio = function (rateFrom, rateTo) {
  const rateFromBig = new BigNumber(rateFrom);
  const rateToBig = new BigNumber(rateTo);

  let ratio = new BigNumber(rateFromBig.div(rateToBig));

  return ratio.toNumber().toFixed(4).valueOf();
};

export const calcFinalResult = function (ratio, inputValue) {
  const ratioBig = new BigNumber(ratio);
  const inputBig = new BigNumber(inputValue);
  const result = new BigNumber(ratioBig.multipliedBy(inputBig));

  return result.toNumber().toFixed(2).valueOf();
};

export const percentageChange = function (x, y) {
  const startPercentage = new BigNumber(100);
  const xBig = new BigNumber(x);
  const yBig = new BigNumber(y);

  const yPerc = new BigNumber(yBig.multipliedBy(startPercentage).div(xBig));
  const percentageChange = new BigNumber(startPercentage.minus(yPerc));

  return percentageChange.toNumber().toFixed(2);
};

export const formatValue = function (value) {
  const bigValue = new BigNumber(value);
  const formattedValue = bigValue.toNumber().toFixed(4);
  return formattedValue;
};

export const formatPercentage = function (value) {
  const valueBig = new BigNumber(value);

  if (valueBig.isEqualTo(0)) {
    return "-";
  }

  if (valueBig.isGreaterThan(0)) {
    return "+" + valueBig.valueOf() + "%";
  }

  if (!valueBig.isGreaterThan(0)) {
    return valueBig.valueOf() + "%";
  }
};
