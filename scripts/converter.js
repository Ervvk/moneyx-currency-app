import searchBoxSetting from "./search.js"
import {hamburgerScript,getCurrencyData} from "./shared.js"
//searchbox setting

function init(){
    searchBoxSetting();
    hamburgerScript();
    getCurrencyData();
    console.log(JSON.parse(localStorage.getItem("fullRatesData")));
}

document.addEventListener('DOMContentLoaded', init());

const quickCalc = function(){
let result = 1000;
let dolar = 3.7885;
let euro  = 4.5562;
let wynik = 0.4*0.2/2;
console.log('wynik:', wynik);
}
quickCalc();

