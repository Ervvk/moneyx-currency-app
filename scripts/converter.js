import searchBoxSetting from "./search.js";
import { hamburgerScript, getCurrencyData, currencyData } from "./shared.js";
import { calcRatio, calcFinalResult } from "./calculations.js";
const selectDropdownFrom = document.querySelector(".selectbox__currency--from");
const selectDropdownTo = document.querySelector(".selectbox__currency--to");
const buttonCalc = document.querySelector(".button--calc");
const inputFrom = document.querySelector(".converter__input--from");
const inputTo = document.querySelector(".converter__input--to");

//searchbox setting

function init() {
  searchBoxSetting();
  hamburgerScript();
  getCurrencyData();
  console.log(JSON.parse(localStorage.getItem("fullRatesData")));
}

document.addEventListener("DOMContentLoaded", init());
buttonCalc.addEventListener("click", function () {
    calcFinalResultDOM();
  });

const getRate = function (currencyCode) {
  const newArray = currencyData.filter((cur) => cur.code === currencyCode);
  console.log(newArray);
  return newArray[0].mid;
};

const calcRatioDOM = function () {
  const currencyFrom = selectDropdownFrom.textContent;
  const currencyTo = selectDropdownTo.textContent;
  getRate(currencyTo);
  const ratio = calcRatio(getRate(currencyFrom), getRate(currencyTo));
  return ratio;
};

const calcFinalResultDOM = function () {
  const ratio = calcRatioDOM();
  const userInput = inputFrom.value;
  const finalValue = calcFinalResult(ratio, userInput);
  inputTo.value = finalValue;
};


