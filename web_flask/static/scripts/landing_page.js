let map;
let userMarker;

const defaultLatitude = 37.7749;
const defaultLongitude = -122.4194;
// map inittializer
function initMap() {
  map = L.map('map').setView([defaultLatitude, defaultLongitude], 12);
  userMarker = L.marker([defaultLatitude, defaultLongitude]).addTo(map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// get user current location
function getLocation() {
  initMap();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
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
  map.setView([latitude, longitude]);
  userMarker = L.marker([latitude, longitude], 12).addTo(map);
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
window.onload = getLocation;