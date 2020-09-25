const currency1 = document.getElementById("euro");
const currency2 = document.getElementById("dollar");
const convert = document.getElementById("convert");

convert.addEventListener('click', function(evt){

});

function show() {
  document.getElementById("dd1").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}