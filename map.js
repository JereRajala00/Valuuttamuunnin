//Author of this file is Tiitus
//this function gets country locations, names and currencies from restcountries.eu
function fetchLocationData() {
  fetch('https://restcountries.eu/rest/v2/all?fields=name;latlng;currencies')
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    setLocations(json);
    //getLocations(json);
  }).catch(function(error) {
    console.log(error);
  });
}

fetchLocationData();

// Function is run when data is fetch
function setLocations(locationData) {

  // Uses leaflet.js -library to show location (https://leafletjs.com/)
  const map = L.map('map').setView([0, 0], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  let markers = [];

  for (let i = 0; i < locationData.length; i++) {
    if (locationData[i] != '') {
      try {
        let location = L.latLng(parseFloat(locationData[i].latlng[0]), parseFloat(locationData[i].latlng[1]));

        setTimeout(function() {
          markers[i] = new L.marker(location).addTo(map).
              bindPopup(locationData[i].name + ', currency: ' + locationData[i].currencies[0].name + ', code: ' + locationData[i].currencies[0].code + ',symbol: ' + locationData[i].currencies[0].symbol)
        }, 100);

      } catch (error) {
        console.log(error);
      }
    }
  }
}

