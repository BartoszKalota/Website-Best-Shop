// Obsługa przesuwanego podkreślenia w menu
// ------------------------------------------------
const mobileMaxWidth = 780;
const hamburger = document.getElementById('menu-trigger');
const menu = document.querySelector('nav .menu');
const menuItems = menu.querySelectorAll('.menu__item');
let defaultWidth = menuItems[0].offsetWidth; // aktualna szerokość pierwszego przycisku menu, na którym domyślnie znajduje się podkreślenie
let customMarginLeft = getComputedStyle(menuItems[0]).marginLeft; // pobranie ustawionej wartości marginesu z pliku CSS
const accentColor1 = '#08A6E4';
if ( window.innerWidth < mobileMaxWidth ) { // żeby pod przejściu z trybu mobilnego na tabletowy, podkreślenie uzyskało odpowiednią szerokość i pozycję
  defaultWidth = 76;
  customMarginLeft = '70px';
}

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
let startOfSection3 = section1.offsetHeight + section2.offsetHeight;
let startOfSection4 = startOfSection3 + section3.offsetHeight;
let startOfSection5 = startOfSection4 + section4.offsetHeight;
window.addEventListener('resize', function(e) { // aktualizacja wysokości sekcji po zmianie trybu (np. na tabletowy)
  startOfSection3 = section1.offsetHeight + section2.offsetHeight;
  startOfSection4 = startOfSection3 + section3.offsetHeight;
  startOfSection5 = startOfSection4 + section4.offsetHeight;
});

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


// Hamburger menu
// ------------------------------------------------
// Gdy zostanie wykryty tryb mobilny po przeładowaniu strony lub zmianie szerokości okna (dlatego wywołanie funkcji jest w 2 miejcach), wykona się odpowiednia instrukcja warunkowa wewnątrz funkcji
handleHamburgerAndUnderlineVisibility();
window.addEventListener('resize', function(e) {
  handleHamburgerAndUnderlineVisibility();
});

function handleHamburgerAndUnderlineVisibility() {
  if ( window.innerWidth < mobileMaxWidth ) {
    hamburger.classList.remove('hidden');
    menuUnderline.classList.add('hidden');
    menu.classList.add('hidden'); // domyślne ukrycie menu w trybie mobilnym

    // Pokazanie/Ukrycie menu
    let counter = 0;
    hamburger.addEventListener('click', function(e) {
      const bars = this.firstElementChild;
      if ( counter % 2 === 0 ) {
        bars.className = 'fas fa-times'; // zmiana hamburgera na X
        menu.classList.remove('hidden');
        menu.classList.remove('menu-animation-reverse');
        menu.classList.add('menu-animation-normal');
        menu.style.transition = '0.3s';
      }
      else {
        bars.className = 'fas fa-bars'; // zmiana X na hamburgera
        setTimeout(function() {
          menu.classList.add('hidden');
        }, 300);
        menu.classList.remove('menu-animation-normal');
        menu.classList.add('menu-animation-reverse');
        menu.style.transition = '0.3s';
      }
      counter++;
    });
  }
  else {
    hamburger.classList.add('hidden');
    menuUnderline.classList.remove('hidden');
    menu.classList.remove('menu-animation-reverse');
    menu.classList.remove('hidden'); // domyślne pokazanie menu w trybach innych niż mobilny
  }
}
// ------------------------------------------------