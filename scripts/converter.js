import searchBoxSetting from "./search.js";
import { hamburgerScript, getCurrencyData, currencyData } from "./shared.js";
import { calcRatio, calcFinalResult } from "./calculations.js";
const selectDropdownFrom = document.querySelector(".selectbox__currency--from");
const selectDropdownTo = document.querySelector(".selectbox__currency--to");
const buttonCalc = document.querySelector(".button--calc");
const buttonSwap = document.querySelector(".button--swap");
const inputFrom = document.querySelector(".converter__input--from");
const inputTo = document.querySelector(".converter__input--to");

//searchbox setting

function init() {
  searchBoxSetting();
  hamburgerScript();
  getCurrencyData();
  console.log(JSON.parse(localStorage.getItem("fullRatesData")));
}



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


const userInputValidation = function(){

    let userInput = inputFrom.value;

    if(userInput.length === 0 || userInput === '.' || userInput === ',') return false;


   userInput  =  userInput.replaceAll(',','.');

   const dotsCount = [...userInput].reduce(function(acc,current){
       if(current === '.') acc += 1;
       return acc;
   },0);

   if(dotsCount > 1) return false;
   inputFrom.value = userInput;

   const regexPattern = /^[0-9.]+$/;

   if(!regexPattern.test(userInput) ) return false;
   return true;


}

export const displayResult = function(){
  const isValidInput = userInputValidation();
  isValidInput? calcFinalResultDOM(): inputTo.value = "Wprowadź poprawną kwotę";
}

export const swapInputs = function(){
  [selectDropdownFrom.textContent, selectDropdownTo.textContent] = 
  [selectDropdownTo.textContent, selectDropdownFrom.textContent];
  console.log(inputFrom.value);
  if(userInputValidation(inputFrom.value)) {displayResult();}
  
}

document.addEventListener("DOMContentLoaded", init());

buttonCalc.addEventListener("click", function () {
displayResult();

  });

buttonSwap.addEventListener('click', function(){
  swapInputs();
});

