// Author of this script: Jere
// Fetch the currency data from open API offered by Central Bank of Europe
var currencyData

window.onload = function () {

  var convertButton = document.getElementById('convert');
  convertButton.addEventListener("click", getRates);
}
function getRates() {
  var currency1 = document.getElementById('dropdown_menu1');
  var selectedValue = currency1.options[currency1.selectedIndex].value;
  fetch('https://api.exchangeratesapi.io/latest?base=' + selectedValue)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    currencyData = json;
    console.log(currencyData);
    convert();
  }).catch(function(error) {
    console.log(error);
  });
}

function convert() {
  var sum = document.getElementById('cash_to_be_converted').value;
  parseFloat(sum);
  var currency2 = document.getElementById('dropdown_menu2');
  var selectedValue2 = currency2.options[currency2.selectedIndex].value;
  var result = document.getElementById("result");
  result.innerHTML = sum * currencyData.rates[selectedValue2];
}
// Get data from currencyData-variable with syntax: currencyData.rates['USD']