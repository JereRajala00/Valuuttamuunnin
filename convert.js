// Author of this script: Jere (Getting data for the dropdown list and some ideas and fixes are by Tiitus :)
// Fetch the currency data from open API offered by Central Bank of Europe
var currencyData;

window.onload = function () {
  var convertButton = document.getElementById('convert');
  getRates().then(addCurrencies);
  convertButton.addEventListener("click", getRates);
}

function updatePlaceholder() {
  var inputField = getSelectedMenuOption();
  inputField[0].setAttribute('placeholder',inputField[2]);
}

function getSelectedMenuOption() {
  var inputField = document.getElementById('cash_to_be_converted');
  var currency1 = document.getElementById('dropdown_menu1');
  var selectedValue = currency1.options[currency1.selectedIndex].innerText;
  var menuOptions = [inputField, currency1, selectedValue]
  return menuOptions;
}
function swap() {
  var currency1 = document.getElementById('dropdown_menu1');
  var currency2 = document.getElementById('dropdown_menu2');
  var firstValue = currency1.options[currency1.selectedIndex];
  currency1.options[currency1.selectedIndex] = currency2.options[currency2.selectedIndex];
  currency2.options[currency2.selectedIndex] = firstValue;
}
async function getRates() {
  var selectedValue = getSelectedMenuOption()[2];
  console.log('Base currency: ' + selectedValue);
  let response;
  try {
    if (selectedValue != null) {
      response = await fetch('https://api.exchangeratesapi.io/latest?base=' + selectedValue);
    } else {
      response = await fetch('https://api.exchangeratesapi.io/latest');
    }
    if (!response.ok) throw new Error('Something went wrong');

      currencyData = await response.json();

      console.log(currencyData);

      var sum = document.getElementById('cash_to_be_converted').value;
      console.log(sum.length);
      if (sum.length > 0) {
        convert();
      }
      return response;

  } catch(error) {
    console.log(error);
  }
}

function convert() {
  var inputField = getSelectedMenuOption()[0];
  var sum = parseFloat(inputField.value);
  var currency2 = document.getElementById('dropdown_menu2');
  var selectedValue2 = currency2.options[currency2.selectedIndex].innerText;
  console.log('Convert to currency: ' + selectedValue2);
  console.log(currencyData.rates[selectedValue2]);
  var result = document.getElementById("result");
  let res = sum * parseFloat(currencyData.rates[selectedValue2]);
  result.innerText = Math.round(res * 100) / 100;
}

function addCurrencies() {
  const dropdownmenu1 = document.getElementById('dropdown_menu1');
  const dropdownmenu2 = document.getElementById('dropdown_menu2');

  dropdownmenu1.querySelector('option').innerText = 'EUR';
  dropdownmenu2.querySelector('option').innerText = 'EUR';

  for (var key in currencyData.rates) {
    var new_option = document.createElement("option");
    new_option.text = key;
    new_option.value = currencyData.rates[key];
    var new_option2 = new_option.cloneNode(true);
    dropdownmenu1.appendChild(new_option);
    dropdownmenu2.appendChild(new_option2);
  }

}
// Get data from currencyData-variable with syntax: currencyData.rates['USD']