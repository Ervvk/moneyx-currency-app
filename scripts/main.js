
// hamburger sidebar code
const btnHamburger = document.querySelector('.hamburger-btn');
const sidebar = document.querySelector('.sidebar');


const burgerClick = function(){
    sidebar.classList.toggle('sidebar--active');

}

btnHamburger.addEventListener('click', burgerClick);

