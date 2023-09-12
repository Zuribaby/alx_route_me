let map;
let userMarker;
const defaultLatitude = 0;
const defaultLongitude = 0;

// custom marker icon object
var customIcon = L.icon({
  iconUrl: '../static/images/redLocation-icon.png',
  iconSize: [32, 32], 
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

/**
 * intitalize and create map instance
 * @returns - Nothing
 */
function initMap() {
  map = L.map('map').setView([defaultLatitude, defaultLongitude], 18);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  getLocation();
}


/**
 * check if geolocation is supported on the device
 * @returns - Nothing
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition, showError, {
      maximumAge: 0,
      enableHighAccuracy: true
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

/** 
 * get users location and display the marker on the map
 * @returns - Nothing
 */
function showPosition(position) {
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
}

/**
 * handles and log errors
 * @param {Object} - error to handle
 * @returns - Nothing
 */
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