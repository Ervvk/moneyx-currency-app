// logic of subpages containing a table of exchange rates

import { hamburgerScript, getCurrencyData, wasDataUpdatedToday } from "./shared.js";
import { topRatesFill, displayAllRates } from "./rates.js";


//import { percentageChange } from "./calculations.js";
const ratesWrapper = document.querySelector(".currency-list");
const lastUpdateDivs = document.querySelectorAll(".last-update");

//display last data update date
const displayLastUpdate = function () { 
  const lastUpdate = JSON.parse(localStorage.getItem("lastUpdateDate"));
  lastUpdateDivs.forEach((el) => {
    el.innerText = lastUpdate;
  });
};

const displayTopRates = function () {
  topRatesFill(["USD", "GBP", "EUR", "CHF", "RUB"]);
};

const colorPercentages = function () {
  const allPercs = document.querySelectorAll(".currency-el__part--change");

  allPercs.forEach((el) => {
    const perc = el.textContent;
    if (perc.charAt(0) === "-") el.style.color = "red";

    if (perc.charAt(0) === "+") el.style.color = "green";
  });
};

function init() {
  hamburgerScript();
  // load data from api once a day
  if(!wasDataUpdatedToday()){
    getCurrencyData().then(function(){
      displayTopRates();  
       displayLastUpdate();
    }
      
      
     );
  }
  //const changeData = JSON.parse(localStorage.getItem("dailyChangeData"));
  //console.log(changeData);


  //

  if (ratesWrapper !== null) {
    displayAllRates();
  }

  colorPercentages();

}

document.addEventListener("DOMContentLoaded", init());
