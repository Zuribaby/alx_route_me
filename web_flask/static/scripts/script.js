document.addEventListener("DOMContentLoaded", function () {
    const userLocation = document.getElementById("userlocation");
    userLocation.addEventListener("click", function () {
      getLocation();
    });
});

function reverseGeocode (lat, lon) {
  const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
  const url = `${nominatimEndpoint}/reverse?format=json&lat=${lat}&lon=${lon}`;
    
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const address = data.display_name;
      document.getElementById('address').textContent = `Address: ${address}`;
    })
    .catch(error => {
      console.error('Error fetching reverse geocoding data:', error);
      document.getElementById('address').textContent = 'Error fetching address data.';
    });
}