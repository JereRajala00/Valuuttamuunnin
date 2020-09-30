// Author of this script: Jere
// Fetch the currency data from open API offered by Central Bank of Europe
var currencyData

fetch('https://api.exchangeratesapi.io/latest')
.then(function(response) {
  return response.json();
}).then(function(json) {
  currencyData = json;
  console.log(currencyData);
}).catch(function(error) {
  console.log(error);
});
function convert() {
  var sum = document.getElementById('cash_to_be_converted').value;
  parseFloat(sum);
  var currency1 = document.getElementById('dropdown_menu1');
  var currency2 = document.getElementById('dropdown_menu2');
  var selectedValue = currency1.options[currency1.selectedIndex].value;
  var selectedValue2 = currency2.options[currency2.selectedIndex].value;
  var result = document.getElementById("result");
  // First starting currency
  if (selectedValue == "eur") {
    if (selectedValue2 == "eur") {
      result.innerHTML = sum;
    } else if (selectedValue2 == "usd") {
      result.innerHTML = sum * currencyData.rates['USD'];
    } else if (selectedValue2 == "aud") {
      result.innerHTML = sum * currencyData.rates['AUD'];
    } else if (selectedValue2 == "cad") {
      result.innerHTML = sum * currencyData.rates['CAD'];
    }
  }
  // Second starting currency
  if (selectedValue == "usd") {
      if (selectedValue2 == "eur") {
        result.innerHTML = sum / currencyData.rates['USD'];
      }
  }
}
// Get data from currencyData-variable with syntax: currencyData.rates['USD']