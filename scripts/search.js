import {currencyData} from "./shared.js"
import {swapInputs, displayResult} from "./converter.js"


const dropdownFrom = document.querySelector(".selectbox__dropdown--from");
const dropdownTo = document.querySelector(".selectbox__dropdown--to");
 const selectDropdownFrom = document.querySelector(".converter__selectbox--from");
 const selectDropdownTo = document.querySelector(".converter__selectbox--to");
const dropdownListFrom = document.querySelector(".dropdown__list--from");
const dropdownListTo = document.querySelector(".dropdown__list--to");
const dropdownInputFrom = document.querySelector(".dropdown__input--from");
const dropdownInputTo = document.querySelector(".dropdown__input--to");
const inputFrom = document.querySelector(".converter__input--from");
//const currencyData = JSON.parse(localStorage.getItem("todayRatesData"));
console.log(currencyData);


const searchBoxSetting = function () {
  //get data to fill dropdown

  console.log(currencyData);
  fillDropdownContent(currencyData, dropdownListFrom);
  fillDropdownContent(currencyData, dropdownListTo);
  openDropdownDOMInteraction();
  searchInputsDOMInteraction();
  selectCurrencyDOMInteraction();
};


const selectCurrencyDOMInteraction = function () {

const preventSameCurrencies = function(targetTitle, secondTitle){
  console.log(targetTitle, secondTitle);
if(targetTitle === secondTitle) swapInputs();
}


  const selectCurrencyActions = function(targetElement, activeDropdown, activeSelect){
    //console.log(targetElement);

    if (targetElement.classList[0] === "dropdown__el") {
      //fill selectbox text content with selected currency code
      

      const targetTitle = targetElement.title; 

      if(activeDropdown === dropdownFrom){
        moveDropdown(dropdownFrom, dropdownTo);
        preventSameCurrencies(targetTitle,selectDropdownTo.firstElementChild.textContent)
      }
      if(activeDropdown === dropdownTo){
        moveDropdown(dropdownTo, dropdownFrom);
        preventSameCurrencies(targetTitle,selectDropdownFrom.firstElementChild.textContent)
      }
      activeSelect.firstElementChild.textContent = targetTitle;
      if(inputFrom.value != "")
      displayResult();
    }
  }

  dropdownListFrom.addEventListener("click", function (e) {
    const targetElement = e.target;
    selectCurrencyActions(targetElement,dropdownFrom, selectDropdownFrom); 
  });

  dropdownListTo.addEventListener("click", function (e) {
    const targetElement = e.target;
    selectCurrencyActions(targetElement,dropdownTo, selectDropdownTo); 
  });
};

const searchInputsDOMInteraction = function () {

  const startSearchValidation = function (searchedValue, activeDropdown) {
    //if input is empty - display all currencies
    if (searchedValue.length === 0) {
      fillDropdownContent(currencyData, activeDropdown);
      return false;
    }

    return searchInputValidation(searchedValue);
  };


  dropdownInputFrom.addEventListener("keyup", function (e) {
    const inputValue = e.target.value;
    const isInputValid = startSearchValidation(inputValue, dropdownListFrom);

    if (isInputValid) {
      const filteredArray = filterCurrencies(inputValue);
      fillDropdownContent(filteredArray, dropdownListFrom);
    }
  });

  dropdownInputTo.addEventListener("keyup", function (e) {
    const inputValue = e.target.value;
    const isInputValid = startSearchValidation(inputValue, dropdownListTo);

    if (isInputValid) {
      const filteredArray = filterCurrencies(inputValue);
      fillDropdownContent(filteredArray, dropdownListTo);
    }
  });
};

const moveDropdown = function (dropdownSelector, checkSelector) {
  const dropdownOpenClass = "selectbox__dropdown--show";

  if (!checkSelector.classList.contains(dropdownOpenClass)) {
    if (dropdownSelector === dropdownFrom)
      fillDropdownContent(currencyData, dropdownListFrom);
    if (dropdownSelector === dropdownTo)
      fillDropdownContent(currencyData, dropdownListTo);
  }

  if (checkSelector.classList.contains(dropdownOpenClass)) {
    checkSelector.classList.remove(dropdownOpenClass);
  }

  dropdownSelector.classList.toggle(dropdownOpenClass);
};

const openDropdownDOMInteraction = function () {
  const clearDropdownInput = function (input) {
    if (input.value.length > 0) input.value = "";
  };

  selectDropdownFrom.addEventListener("click", function (e) {
    moveDropdown(dropdownFrom, dropdownTo);
    clearDropdownInput(dropdownInputFrom);
  });

  selectDropdownTo.addEventListener("click", function (e) {
    moveDropdown(dropdownTo, dropdownFrom);
    clearDropdownInput(dropdownInputTo);
  });
};

const fillDropdownContent = function (ratesData, dropdownList) {
  const frag = document.createDocumentFragment();

  ratesData.forEach((row) => {

      const newElement = createDropdownEl(row.currency, row.code);
      frag.appendChild(newElement);
    
  });

  dropdownList.innerHTML = "";
  dropdownList.appendChild(frag);
};

const createDropdownEl = function (currency, code) {
  const newEl = document.createElement("li");
  newEl.classList.add("dropdown__el");
  newEl.classList.add("prevent-closing");
  newEl.title = code;

  newEl.innerHTML = `<div class="dropdown__el__flag">
  <div class="currency-flag currency-flag-lg currency-flag-${code.toLowerCase()}"></div>
</div>
<div class="dropdown__el__names">
<div class="dropdown__el__code">${code}</div>
<div class="dropdown__el__full-name">${currency}</div>
</div>`;

  return newEl;
};

const searchInputValidation = function (selectedInput) {
  const regexPattern = /^[a-zA-Z-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ][a-zA-ZzżźćńółęąśŻŹĆĄŚĘŁÓŃ \s]*$/;
  if (!regexPattern.test(selectedInput)) return false;
  return true;
};

const filterCurrencies = function (searchedInput) {
  const filteredData = currencyData.filter(
    (cur) =>
      cur.code.toLowerCase().includes(searchedInput.toLowerCase()) ||
      cur.currency.toLowerCase().includes(searchedInput.toLowerCase())
  );

  return filteredData;
};

document.addEventListener('click', function(e){
  const targetElement = e.target;
 
  if(!targetElement.classList.contains('prevent-closing')){
    console.log("X");
if(dropdownFrom.classList.contains('selectbox__dropdown--show'))
{moveDropdown(dropdownFrom, dropdownTo);}
if(dropdownTo.classList.contains('selectbox__dropdown--show'))
{moveDropdown(dropdownTo, dropdownFrom);}

  }
});


export default searchBoxSetting;
