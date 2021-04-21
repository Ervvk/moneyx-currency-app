import searchBoxSetting from "./search.js"
import {hamburgerScript,getCurrencyData} from "./shared.js"
//searchbox setting



function init(){
    searchBoxSetting();
    hamburgerScript();
    getCurrencyData();
    console.log(JSON.parse(localStorage.getItem("storedRatesData")));
}

document.addEventListener('DOMContentLoaded', init());