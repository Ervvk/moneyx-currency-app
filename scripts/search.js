const dropdownFrom = document.querySelector(".selectbox__dropdown--from");
const dropdownTo = document.querySelector(".selectbox__dropdown--to");
const selectDropdownFrom = document.querySelector(".converter__selectbox--from");
const selectDropdownTo = document.querySelector(".converter__selectbox--to");
/*const dropdownInputs = document.querySelectorAll(".dropdown__input");
const dropdownInputWrappers = document.querySelectorAll();*/
const dropdownListFrom = document.querySelector(".dropdown__list--from");
const dropdownListTo = document.querySelector(".dropdown__list--to");


const searchBoxSetting = function () {

//get data to fill dropdown
const currencyData = JSON.parse(localStorage.getItem('todayRatesData'));

  fillDropdownContent(currencyData);
  searchBoxDOMInteraction();
 

}


const searchBoxDOMInteraction = function(){
  const dropdownOpenClass = "selectbox__dropdown--show";

  const showDropdown = function (dropdownSelector, checkSelector) {
    if (checkSelector.classList.contains(dropdownOpenClass)) {
      checkSelector.classList.remove(dropdownOpenClass);
    }

    dropdownSelector.classList.toggle(dropdownOpenClass);
  };

  selectDropdownFrom.addEventListener("click", function (e) {
    showDropdown(dropdownFrom, dropdownTo);
  });

  selectDropdownTo.addEventListener("click", function (e) {
    showDropdown(dropdownTo, dropdownFrom);
  });
};






const fillDropdownContent = function(ratesData){
  const frag = document.createDocumentFragment();
 

  ratesData.forEach(row=>{

    if(row.code !== 'XDR'){
    const newElement = createDropdownEl(row.currency, row.code);
    frag.appendChild(newElement);
    }

  });
const fragCopy = frag.cloneNode(true);

  dropdownListFrom.appendChild(frag);
  dropdownListTo.appendChild(fragCopy);


}


const createDropdownEl = function (currency, code) {


  const newEl = document.createElement("li");
  newEl.classList.add('dropdown__el');

  newEl.innerHTML = 
  `<div class="dropdown__el__flag">
  <div class="currency-flag currency-flag-lg currency-flag-${code.toLowerCase()}"></div>
</div>
<div class="dropdown__el__names">
<div class="dropdown__el__code">${code}</div>
<div class="dropdown__el__full-name">${currency}</div>
</div>`; 

 return newEl;

};







export default searchBoxSetting;
