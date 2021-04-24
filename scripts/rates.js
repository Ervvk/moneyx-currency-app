import {formatPercentage, formatValue} from "./calculations.js";


const topValueElements = document.querySelectorAll('.top-rates__part--value');
const topChangeElements = document.querySelectorAll('.top-rates__part--change');

const changeData = JSON.parse(localStorage.getItem("dailyChangeData"));

const createRatesElements = function (code,curName, value, change) {
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
                >1.312442</span
              >
              <span class="currency-el__part currency-el__part--change change--up"
                >+0.57%
              
              </span>
            `;
  
    return newEl;
  };





  

  export const topRatesFill = function(topCodes){
      
topValueElements.forEach((el,index) => {
  
    const foundCurrency = filterByCode(topCodes[index]);

    el.textContent = formatValue(foundCurrency.mid);
    topChangeElements[index].textContent = formatPercentage(foundCurrency.change);

});



  }





  const filterByCode  = function(searchedCode){
const filteredValue = changeData.filter((cur) =>
cur.code === searchedCode);
return filteredValue[0];
  }



  const displayAllRates = function (ratesData, dropdownList) {
    const frag = document.createDocumentFragment();
  
    ratesData.forEach((row) => {
  
        const newElement = createDropdownEl(row.currency, row.code);
        frag.appendChild(newElement);
      
    });
  
    dropdownList.innerHTML = "";
    dropdownList.appendChild(frag);
  };

