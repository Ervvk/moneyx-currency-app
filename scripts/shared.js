

export const getCurrencyData = async function(){
    try{
    let res = [];
    res = await fetch(`http://api.nbp.pl/api/exchangerates/tables/a/last/2`);
    const data = await res.json();

    // selected data ready to use in app
    const todayRatesData = data[1].rates;
    todayRatesData.unshift({currency:"złoty (Polska)", code:"PLN",mid:1.0});
   
  
 
    //window.localStorage.removeItem('todayRatesData');
    localStorage.setItem('fullRatesData', JSON.stringify(data));
    localStorage.setItem('todayRatesData', JSON.stringify(todayRatesData));


    }
    catch(err){
      console.log(err);
    }
 

  /*
    const dailyMids = data.rates.map(r => r.mid);
    const researchDate = data.rates.map(r => r.effectiveDate);

    return {dailyMids,researchDate};
    */

 
    
  
  }




export const hamburgerScript = function(){
    
// hamburger sidebar code


const btnHamburger = document.querySelector(".hamburger-btn");
const sidebar = document.querySelector(".sidebar");

const burgerClick = function () {
  sidebar.classList.toggle("sidebar--active");
};

btnHamburger.addEventListener("click", burgerClick);

}



