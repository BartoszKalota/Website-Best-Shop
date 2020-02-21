// Lewa strona
const prodquantInput = document.getElementById('prod-quant');
const ordersinmonthInput = document.getElementById('orders-in-month');
const packageSelect = document.getElementById('set-package');
    const dropdown = packageSelect.querySelector('#set-package--menu');
    const menuItems = dropdown.querySelectorAll('.set-package--menu-item');
const accountingCheckbox = document.getElementById('accounting-checkbox');
const terminalCheckbox = document.getElementById('terminal-checkbox');
// Prawa strona
const divProducts = document.getElementById('products');
const prodCalc = document.getElementById('prod-calc');
const prodSum = document.getElementById('prod-sum');
const divOrders = document.getElementById('orders');
const ordCalc = document.getElementById('ord-calc');
const ordSum = document.getElementById('ord-sum');
const divPackage = document.getElementById('package');
const packCalc = document.getElementById('pack-calc');
const packSum = document.getElementById('pack-sum');
const divAccounting = document.getElementById('accounting');
const accSum = document.getElementById('acc-sum');
const divTerminal = document.getElementById('terminal');
const termSum = document.getElementById('term-sum');
const totalPrice = document.getElementById('total-price');

// Tymczasowa wartość w polu Total
totalPrice.innerText = `$0`;

// Dropdown

// Domyślne ukrycie dropdowna
dropdown.style.display = 'none';
// Pokazanie/Ukrycie dropdowna
packageSelect.addEventListener('click', function(e) {
    const arrow = this.querySelector('#set-package__img');
    if ( dropdown.style.display === 'none' ) {
        dropdown.style.display = 'block';
        dropdown.classList.remove('dropdown-slide-reverse');
        dropdown.classList.add('dropdown-slide-normal');
        arrow.style.transform = 'rotate(180deg)';
        arrow.style.transition = '0.4s';
        // Nadanie zdarzenia na opcje do wyboru
        menuItems.forEach(function(menuItem) {
            // Wstawienie wybranego pakietu (opcji) w pole select
            menuItem.addEventListener('click', function(e) {
                const viewOption = this.parentElement.parentElement.querySelector('#set-package__placeholder');
                viewOption.innerText = this.innerText;
                viewOption.style.color = '#222';
            });
        });
    }
    else {
        setTimeout(function() {
            dropdown.style.display = 'none';
        }, 500);
        dropdown.classList.remove('dropdown-slide-normal');
        dropdown.classList.add('dropdown-slide-reverse');
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.transition = '0.4s';
    }
});

// Kalkulacja

// Domyślne ukrycie divów z kalkulacją
divProducts.style.display = 'none';
divOrders.style.display = 'none';
divPackage.style.display = 'none';
divAccounting.style.display = 'none';
divTerminal.style.display = 'none';
// Uwzględnienie inputa z ilością produktów
prodquantInput.addEventListener('keyup', function(e) {
    const self = this;
    calculateInput(divProducts, 0.5, prodCalc, prodSum, self);
});
// Uwzględnienie inputa z ilością zamówień
ordersinmonthInput.addEventListener('keyup', function(e) {
    const self = this;
    calculateInput(divOrders, 0.25, ordCalc, ordSum, self);
});
// Kalkulacja inputów
function calculateInput(divType, priceValue, calcType, sumType, self) {
    if ( self.value !== '' ) {
        divType.style.display = 'grid';
        // Walidacja wprowadzonej liczby do inputa
        const amount = Math.abs(Math.round( self.value ));

        const price = priceValue;
        calcType.innerText = `${amount} * $${price}`;
        const sum = amount * price;
        sumType.innerText = `$${sum}`;
        // Wstawienie w input poprawnej liczby (żeby było to samo co na pasku z kalkulacją)
        self.value = amount;
    }
    else {
        // Gdy input jest pusty, korespondujący z nim div znika, a pole Total przyjmuje poprawną wartość
        divType.style.display = 'none';
        sumType.innerText = `$0`;
    }
    showTotal();
}
// Kalkulacja pakietu z dropdowna
menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function(e) {
        divPackage.style.display = 'grid';
    
        const viewOption = this.innerText;
        packCalc.innerText = viewOption;

        const sum = parseInt( this.dataset.price );
        packSum.innerText = `$${sum}`;

        showTotal();
    });
});
// Uwzględnienie checkboxa accounting
accountingCheckbox.addEventListener('change', function(e) {
    const self = this;
    calculateCheckbox(divAccounting, accSum, self);
});
// Uwzględnienie checkboxa terminal
terminalCheckbox.addEventListener('change', function(e) {
    const self = this;
    calculateCheckbox(divTerminal, termSum, self);
});
// Kalkulacja checkboxów
function calculateCheckbox(divType, sumType, self) {
    if ( self.checked === true ) {
        divType.style.display = 'grid';
        const sum = parseInt( self.dataset.price );
        sumType.innerText = `$${sum}`;
    }
    else {
        // Gdy checkbox zostaje odznaczony, korespondujący z nim div znika, a pole Total przyjmuje poprawną wartość
        divType.style.display = 'none';
        sumType.innerText = `$0`;
    }
    showTotal();
}

// Suma
function showTotal() {
    // Pobranie wszystkich sum cząstkowych do tablicy
    const sumArr = [prodSum.innerText, ordSum.innerText, packSum.innerText, accSum.innerText, termSum.innerText];
    // Konwersja sum cząstkowych do czystych liczb (bez $) i obliczenie biężacej sumy całkowitej
    let sum = 0;
    for (let i = 0; i < sumArr.length; i++) {
        let pureNumber = parseFloat( sumArr[i].replace('$', '') );
        // Po konwersji na liczbę, pusty string staje się NaN, więc trzeba go zamienić na 0
        if ( isNaN(pureNumber) ) {
            pureNumber = 0;
        }
        sum += pureNumber;
    }
    totalPrice.innerText = `$${sum}`;
}