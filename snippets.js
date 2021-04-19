'use strict';

const btn = document.querySelector('.country__btn');
const countriesContainer = document.querySelector('.countries');
const inp = document.querySelector('.country__inp');
const imago = document.querySelector('.country__img');
const lineChart = document.getElementById('line-chart').getContext('2d');


/*
const getApi = function(country){
    const request  = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
    request.send();
    
    request.addEventListener('load', function(){
        const data = JSON.parse(this.responseText);
        console.log(data);
       
        const[{flag,name}] = data;
      setFlag(flag);
       
  
    })
    
};


const getApiFetch = function(country){
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
  .then(response => response.json())
  .then(data =>{
    const[{flag,name}] = data;
    setFlag(flag);
  })
  .catch(err => console.log(err.message))

}
const whereAmI = function(lat, lng){
fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
.then( response => response.json())
.then(data =>{
 if(!data.city) throw new Error('NARA');
  console.log('jestes w', data.city);
})
.catch(err => console.log('error:',err.message))
}

const setFlag = function(flagLink){
imago.src = flagLink;
};
btn.addEventListener('click',function(){
const country = inp.value;
getApiFetch(country);
});
whereAmI(52.508, 13.381);


*/
btn.addEventListener('click',function(){
  const getInp = inp.value;
  keepData(getInp);
})
const getCurrencyData = async function(currency,days){
  const res = await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/last/${days}`);
  const data = await res.json();
console.log(data);
  const dailyMids = data.rates.map(r => r.mid);
  const researchDate = data.rates.map(r => r.effectiveDate);
  

   return {dailyMids,researchDate};

}
//nbpConsume();

const keepData = async function(currency){
  const zmienna = await getCurrencyData(currency,'30');
  console.log(zmienna);
  LineChartFunc(lineChart,zmienna);
}





  function LineChartFunc(domContext, data){
  let chart =  new Chart(domContext , {
    // The type of chart 
    type: 'line',
  
    // The data for dataset
    data: {
        labels: data.researchDate,
        datasets: [{
            label: 'GBP - PLN',
            backgroundColor: 'transparent',
            borderColor: 'rgb(19, 38, 138)',
            data: data.dailyMids
        },
      
      
      ]
    },
  
    // Configuration options
    options: {
      maintainAspectRatio: false,
      
    }
  });
  }


  const getCurrencyDataC = async function(currency,days){
    const res = await fetch(`http://api.nbp.pl/api/exchangerates/tables/a/last/${days}/`);
    const data = await res.json();
  console.log(data);
   
  

  
  }
  getCurrencyDataC('gbp','5');



  const polishContent = document.querySelectorAll('.lan-PL');
  const englishContent = document.querySelectorAll('.lan-ENG');
const btnLanPl = document.querySelector('.language-wrap__btn--pl');
const btnLanEng = document.querySelector('.language-wrap__btn--eng');




const setLanguageVersion = function(dataContent){
  dataContent.forEach(element => {
   element.classList.remove('lang-hide')
  });
};
const removeLanguageVersion = function(dataContent){
  dataContent.forEach(element => {
    element.classList.add('lang-hide')
   });
};


  (function appInit(){
    setLanguageVersion(englishContent);
    removeLanguageVersion(polishContent)
})();



btnLanPl.addEventListener('click', function(){
  if(polishContent[0].classList.contains('lang-hide')){
    setLanguageVersion(polishContent);
    removeLanguageVersion(englishContent)
  }

});

btnLanEng.addEventListener('click', function(){
  if(englishContent[0].classList.contains('lang-hide')){
    setLanguageVersion(englishContent);
    removeLanguageVersion(polishContent)
  }
});
