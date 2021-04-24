//exchange rate tables logic 
import { formatPercentage, formatValue } from "./calculations.js";

const topValueElements = document.querySelectorAll(".top-rates__part--value");
const topChangeElements = document.querySelectorAll(".top-rates__part--change");


// create new exchange rate table element 
const createRatesElement = function (code, curName, value, change) {
  const newEl = document.createElement("div");
  newEl.classList.add("currency-list__el");
  newEl.classList.add("currency-el");
  newEl.title = curName;

  newEl.innerHTML = ` 
              <div class="currency-el__part currency-el__part--flag">
                <div class="currency-flag currency-flag-lg currency-flag-${code.toLowerCase()}"></div>
            
              </div>
              <span class="currency-el__part currency-el__part--code">1 ${code} - PLN  </span>
              <span class="currency-el__part currency-el__part--value"
                >${formatValue(value)}</span
              >
              <span class="currency-el__part currency-el__part--change change--up"
                >${formatPercentage(change)}
              
              </span>
            `;

  return newEl;
};
//display all table elements (Rates subpage) with the use of createRatesElement function
export const displayAllRates = function () {
  const changeData = JSON.parse(localStorage.getItem("dailyChangeData"));
  changeData.shift();
  const ratesWrapper = document.querySelector(".currency-list");
  const frag = document.createDocumentFragment();

  changeData.forEach((row) => {
    const newElement = createRatesElement(
      row.code,
      row.currency,
      row.mid,
      row.change
    );
    frag.appendChild(newElement);
  });

  ratesWrapper.innerHTML = "";
  ratesWrapper.appendChild(frag);
};
// fill home page table with data
export const topRatesFill = function (topCodes) {
  topValueElements.forEach((el, index) => {
    const foundCurrency = filterByCode(topCodes[index]);
    el.textContent = formatValue(foundCurrency.mid);
    topChangeElements[index].textContent = formatPercentage(
      foundCurrency.change
    );
  });
};
// search for currency change info by code
const filterByCode = function (searchedCode) {
  const changeData = JSON.parse(localStorage.getItem("dailyChangeData"));
  const filteredValue = changeData.filter((cur) => cur.code === searchedCode);
  return filteredValue[0];
};
