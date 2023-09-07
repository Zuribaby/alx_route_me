let map;
let userMarker;
const defaultLatitude = 0;
const defaultLongitude = 0;

// map inittializer
function initMap() {
  map = L.map('map').setView([defaultLatitude, defaultLongitude], 18);
  //userMarker = L.marker([defaultLatitude, defaultLongitude]).addTo(map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  getLocation();
}

var customIcon = L.icon({
  iconUrl: '../static/images/redLocation-icon.png', // Replace with your custom icon URL
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

// get user current location
function getLocation() {
  if (navigator.geolocation) {
    var watchId = navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// show user location on the map
function showPosition(position) {
  console.log("Latitude:", position.coords.latitude);
  console.log("Longitude:", position.coords.longitude);
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  if (userMarker) {
    map.removeLayer(userMarker);
  }
  map.setView([latitude, longitude], 15);
  userMarker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
  const lati = document.getElementById("lat");
  const long = document.getElementById("lon");
  lati.textContent = "Latitude: " + latitude;
  long.textContent = "Longitude: " + longitude;
  reverseGeocode(latitude, longitude);
}

// error handler
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
  }
}

window.onload = initMap;