// Obsługa przesuwanego podkreślenia w menu
// ------------------------------------------------
const menu = document.querySelector('nav .menu');
const menuItems = menu.querySelectorAll('.menu__item');
let defaultWidth = menuItems[0].offsetWidth; // aktualna szerokość pierwszego przycisku menu, na którym domyślnie znajduje się podkreślenie
const customMarginLeft = getComputedStyle(menuItems[0]).marginLeft; // pobranie ustawionej wartości marginesu z pliku CSS
const accentColor1 = '#08A6E4';

// Stworzenie podkreślenia
const menuUnderline = document.createElement('div');
menuUnderline.id = 'menu__underline';
menuUnderline.style.width = `${defaultWidth}px`;
menuUnderline.style.height = '4px';
menuUnderline.style.background = accentColor1;
menuUnderline.style.position = 'absolute';
menuUnderline.style.bottom = '0';
menuUnderline.style.left = customMarginLeft;
menuUnderline.style.transition = '0.2s ease';
menu.appendChild(menuUnderline);

// Przesuwanie podkreślenia
const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const section3 = document.getElementById('section3');
const section4 = document.getElementById('section4');
const startOfSection3 = section1.offsetHeight + section2.offsetHeight;
const startOfSection4 = startOfSection3 + section3.offsetHeight;
const startOfSection5 = startOfSection4 + section4.offsetHeight;

window.addEventListener('scroll', function(e) {
  if ( this.pageYOffset < startOfSection3 ) {
    menuUnderline.style.width = `${menuItems[0].offsetWidth}px`;
    menuUnderline.style.left = customMarginLeft;
    markTheButtonAsSelected(menuItems[0].firstElementChild);
  }
  else if (
    this.pageYOffset >= startOfSection3 &&
    this.pageYOffset < startOfSection4
  ) {
    menuUnderline.style.width = `${menuItems[1].offsetWidth}px`;
    menuUnderline.style.left = `${parseInt(customMarginLeft) * 2 + menuItems[0].offsetWidth}px`;
    markTheButtonAsSelected(menuItems[1].firstElementChild);
  }
  else if (
    this.pageYOffset >= startOfSection4 &&
    this.pageYOffset < startOfSection5
  ) {
    menuUnderline.style.width = `${menuItems[2].offsetWidth}px`;
    menuUnderline.style.left = `${parseInt(customMarginLeft) * 3 + menuItems[0].offsetWidth + menuItems[1].offsetWidth}px`;
    markTheButtonAsSelected(menuItems[2].firstElementChild);
  }
  else {
    menuUnderline.style.width = `${menuItems[3].offsetWidth}px`;
    menuUnderline.style.left = `${parseInt(customMarginLeft) * 4 + menuItems[0].offsetWidth + menuItems[1].offsetWidth + menuItems[2].offsetWidth}px`;
    markTheButtonAsSelected(menuItems[3].firstElementChild);
  }
});

function markTheButtonAsSelected(thisBtn) {
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].firstElementChild.classList.remove('menu__link--selected');
  }
  thisBtn.classList.add('menu__link--selected');
}
// ------------------------------------------------