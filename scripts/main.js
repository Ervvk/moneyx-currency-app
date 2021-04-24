import { hamburgerScript, getCurrencyData } from "./shared.js";
import {topRatesFill} from "./rates.js";

//import { percentageChange } from "./calculations.js";

const lastUpdateDivs = document.querySelectorAll('.last-update');
const ratesWrapper = document.querySelector('.currency-list');



const displayLastUpdate = function () {
    const lastUpdate = JSON.parse(localStorage.getItem("lastUpdateDate"));
    lastUpdateDivs.forEach((el) => {
      el.innerText = lastUpdate;
    });
  };

  const displayTopRates = function() {
      topRatesFill(['USD','GBP','EUR','CHF','RUB']);
      };




 






function init() {
  hamburgerScript();
  getCurrencyData();
  displayTopRates();
  displayLastUpdate();
}



document.addEventListener("DOMContentLoaded", init());



