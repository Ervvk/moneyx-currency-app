import { percentageChange } from "./calculations.js";
export const currencyData = JSON.parse(localStorage.getItem("todayRatesData"));

export const getCurrencyData = async function () {
  try {
    let res = await fetch(
      `https://api.nbp.pl/api/exchangerates/tables/a/last/2`
    );
    const data = await res.json();
    buildStorage(data);
  } catch (err) {
    console.log(err);
  }
};

export const hamburgerScript = function () {
  // hamburger sidebar code

  const btnHamburger = document.querySelector(".hamburger-btn");
  const sidebar = document.querySelector(".sidebar");
  const burgerClick = function () {
    sidebar.classList.toggle("sidebar--active");
  };

  btnHamburger.addEventListener("click", burgerClick);
};

const buildStorage = function (data) {
  // selected data ready to use in app
  const lastUpdateDate = data[1].effectiveDate;
  const todayRatesData = data[1].rates;
  const ydayRatesData = data[0].rates;
  //remove unwanted xdr currency
  todayRatesData.pop();
  ydayRatesData.pop();
  //add pln to arrays
  todayRatesData.unshift({ currency: "złoty (Polska)", code: "PLN", mid: 1.0 });
  ydayRatesData.unshift({ currency: "złoty (Polska)", code: "PLN", mid: 1.0 });
  //window.localStorage.removeItem('todayRatesData');
  localStorage.setItem("fullRatesData", JSON.stringify(data));
  localStorage.setItem("todayRatesData", JSON.stringify(todayRatesData));
  localStorage.setItem("ydayRatesData", JSON.stringify(ydayRatesData));
  localStorage.setItem("lastUpdateDate", JSON.stringify(lastUpdateDate));

  const dailyChangeData = buildPercentagesArray();

  localStorage.setItem("dailyChangeData", JSON.stringify(dailyChangeData));
};

const buildPercentagesArray = function () {
  const todayRates = JSON.parse(localStorage.getItem("todayRatesData"));
  const ydayRates = JSON.parse(localStorage.getItem("ydayRatesData"));
  const dailyChangeData = [];
  todayRates.forEach((element, index) => {
    dailyChangeData.push(element);
    //push new element with new 'change' attribute
    dailyChangeData[index].change = percentageChange(
      element.mid,
      ydayRates[index].mid
    );
  });
  return dailyChangeData;
};

///////////////////////start with date lock api
 function currentDate(){
  const now = new Date();
  const html = ` ${now.getFullYear()}-${now.getMonth()+1<10?`0${now.getMonth()+1}`:now.getMonth()+1}-${now.getDate()<10?`0${now.getDate()}`:now.getDate()} `;
return html;
 }

export function wasDataUpdatedToday(){
  const lastUpdate = localStorage.getItem("lastUpdateDate");
  if (lastUpdate === null) {
    return false; 
   }
  
  if(lastUpdate === currentDate()) return true;
  if(lastUpdate !== currentDate()) return false;


}


