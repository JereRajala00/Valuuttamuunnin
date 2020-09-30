// Author of this script: Jere
// Fetch the currency data from open API offered by Central Bank of Europe
var currencyData

window.onload = function () {
  getRates().then(addCurrencies);
  var convertButton = document.getElementById('convert');
  convertButton.addEventListener("click", getRates);
}
async function getRates() {
  var currency1 = document.getElementById('dropdown_menu1');
  var selectedValue = currency1.options[currency1.selectedIndex].value;
  fetch('https://api.exchangeratesapi.io/latest?base=' + selectedValue)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    while (json == null) {}

    currencyData = json;
    console.log(currencyData);
    var sum = document.getElementById('cash_to_be_converted').value;
    parseFloat(sum);
    if (sum.length > 0) {
      convert();
    }
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
async function addCurrencies() {
  console.log(currencyData.rates.length);
  for (let i=0;i<currencyData.rates.length;i++) {
    console.log("moi");
    var new_option = document.createElement("option");
    new_option.text = currencyData.rates[i];
    console.log(currencyData.rates[1]);
    new_option.value = currencyData.rates[i];
    var dropdownmenu1 = document.getElementById('dropdown_menu1');
    dropdownmenu1.appendChild(new_option);
  }
}
// Get data from currencyData-variable with syntax: currencyData.rates['USD']