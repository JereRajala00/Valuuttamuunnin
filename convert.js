// Author of this script: Jere (Getting data for the dropdown list and some ideas and fixes are by Tiitus :)
// Fetch the currency data from open API offered by Central Bank of Europe
var currencyData; // Get data from currencyData-variable with syntax: currencyData.rates['USD']

window.onload = function () {
  var convertButton = document.getElementById('convert');
  getRates().then(addCurrencies);                                                 //fetch rates from api when site is load, adds currencies to dropdown menus when fetch is complete
  convertButton.addEventListener("click", getRates);                              //fetch rates from api when convert button is clicked
}
//this function sets input field placeholder to selected base currency
function updatePlaceholder() {
  var menuOption = getSelectedMenuOption();
  menuOption[0].setAttribute('placeholder',menuOption[2]);
}
//this function gets nodes for input field and dropdown menu 1 and gets the selected base currency
function getSelectedMenuOption() {
  var inputField = document.getElementById('cash_to_be_converted');
  var currency1 = document.getElementById('dropdown_menu1');
  var selectedValue = currency1.options[currency1.selectedIndex].innerText;

  var menuOptions = [inputField, currency1, selectedValue]
  return menuOptions;
}
//this function swaps dropdownmenu selectors between them
$("#swap").click(function() {
  var row = $(this).closest("#currencySelectors");
  var start = row.find("span.currencies:first select");
  var end = row.find("span.currencies:last select");
  var temp = start.val();
  start.val(end.val());
  end.val(temp);
  updatePlaceholder();
});
//this function gets currency rates from exchangeratesapi.io api
async function getRates() {
  var menuOption = getSelectedMenuOption();
  var selectedValue = menuOption[2];   //gets selected base currency
  console.log('Base currency: ' + selectedValue);
  let response;
  try {
    //fetches with default base currency(EUR) if base currency is not selected
    if (selectedValue != null) {
      response = await fetch('https://api.exchangeratesapi.io/latest?base=' + selectedValue);
    } else {
      response = await fetch('https://api.exchangeratesapi.io/latest');
    }
    if (!response.ok) throw new Error('Something went wrong');

      currencyData = await response.json();   //sets data from api to a global variable

      console.log(currencyData);
      var sum = menuOption[0].value;      //gets number from input field

      if (sum.length > 0) {
        convert(selectedValue);
      }
      return response;

  } catch(error) {
    console.log(error);
  }
}
//this function converts currency after newest rates is fetch and sets the result
function convert(selectedValue) {
  var inputField = getSelectedMenuOption()[0];
  var sum = parseFloat(inputField.value);
  var currency2 = document.getElementById('dropdown_menu2');
  var selectedValue2 = currency2.options[currency2.selectedIndex].innerText;

  console.log('Convert to currency: ' + selectedValue2);
  console.log(currencyData.rates[selectedValue2]);

  var result = document.getElementById("result");

  let res;
  //if same selected base currency and currency to convert to is selected, result is what's in the input field
  if (selectedValue == selectedValue2) {
    res = Math.round(sum * 100) / 100;
  } else {
    res = sum * parseFloat(currencyData.rates[selectedValue2]) ;
  }
  const base = document.getElementById("base");
  base.innerText = sum + ' ' + selectedValue;
  result.innerHTML =  Math.round(res * 100) / 100 + ' ' +  selectedValue2;
}
//this function adds all currencies included in the API to the dropdown menus
function addCurrencies() {
  const dropdownmenu1 = document.getElementById('dropdown_menu1');
  const dropdownmenu2 = document.getElementById('dropdown_menu2');

  dropdownmenu1.querySelector('option').innerText = 'EUR';
  dropdownmenu2.querySelector('option').innerText = 'EUR';

  for (var key in currencyData.rates) {
    var new_option = document.createElement("option");
    new_option.text = key;
    new_option.value = currencyData.rates[key];
    var new_option2 = new_option.cloneNode(true); //clones the node for dropdown menu 2
    dropdownmenu1.appendChild(new_option);
    dropdownmenu2.appendChild(new_option2);
  }
}
// Get data from currencyData-variable with syntax: currencyData.rates['USD']