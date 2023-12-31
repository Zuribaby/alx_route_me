document.addEventListener("DOMContentLoaded", function () {
    const dropdownButton = document.querySelector('.dropdown-button');
    const menuItems = document.querySelector('.menu-items');
  
    dropdownButton.addEventListener('click', function () {
      menuItems.classList.toggle('show-menu');
    });
});

/**
 * reverse geocode location coordinate.
 * @param {number} lat - latitude
 * @param {number} lon - longitude
 * @returns - Nothing
 */
function reverseGeocode (lat, lon) {
  const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
  const url = `${nominatimEndpoint}/reverse?format=json&lat=${lat}&lon=${lon}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const address = data.display_name;
      document.getElementById('address').textContent = `Address: ${address}`;
      showLocation(lat, lon);
    })
    .catch(error => {
              console.error('Error fetching reverse geocoding data:', error);
      document.getElementById('address').textContent = 'Address unavailable.';
    });
}

/**
 * close message pop up
 * @returns - Nothing
 */
function closeInfo () {
    const Message = document.getElementById("info-message");
    Message.style.display = "none";    
}

/**
 * get coordinate bounding box
 * @returns {Promise} - bounding box of coordinate
 */
function getBoundingBox() {
  const latitudeString = document.getElementById("lat").textContent;
  const longitudeString = document.getElementById("lon").textContent;
  const latitudeParts = latitudeString.split(':');
  const longitudeParts = longitudeString.split(':');
  const latitudeNumericPart = latitudeParts[1];
  const longitudeNumericPart = longitudeParts[1];
  const trimmedLaNumericPart = latitudeNumericPart.trim();
  const trimmedLoNumericPart = longitudeNumericPart.trim();
  const lat = parseFloat(trimmedLaNumericPart);
  const lon = parseFloat(trimmedLoNumericPart);
  const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
  const url = `${nominatimEndpoint}/reverse?format=json&lat=${lat}&lon=${lon}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.boundingbox);
      return data.boundingbox;
    })
    .catch(error => {
      console.error('Error fetching boundingbox of geocoding data:', error);
    });
}