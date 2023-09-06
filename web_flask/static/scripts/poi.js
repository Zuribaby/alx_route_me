document.addEventListener("DOMContentLoaded", function () {
    const hotelsSearch = document.getElementById("hotels");

    const hospitalsSearch = document.getElementById("hospitals");
    hotelsSearch.addEventListener("click", function () {
      fetchHotels();
    });

    hospitalsSearch.addEventListener("click", function () {
        fetchHospitals();
    });
});


function fetchHotels() {
  const coord = getcoordinate();
  fetch('https://www.overpass-api.de/api/interpreter?', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'utf-8' // Change content type
    },
    body: `[out:json];node(${coord.minLatitude},${coord.minLongitude},${coord.maxLatitude},${coord.maxLongitude})[tourism=hotel];out;`
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    data.elements.forEach(hotel => {
      const lat = hotel.lat;
      const lon = hotel.lon;
      // Create a marker for the hospital
      map.setView([lat, lon], 12);
      var hotel = L.marker([lat, lon]).addTo(map);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
  
function fetchHospitals() {
  const coord = getcoordinate();
  fetch('https://www.overpass-api.de/api/interpreter?', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'utf-8' // Change content type
    },
    body: `[out:json];node(${coord.minLatitude},${coord.minLongitude},${coord.maxLatitude},${coord.maxLongitude})[amenity=hospitel];out;`
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    data.elements.forEach(hospital => {
      const lat = hospital.lat;
      const lon = hospital.lon;
      // Create a marker for the hospital
      map.setView([lat, lon], 12);
      var hospital = L.marker([lat, lon]).addTo(map);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function getcoordinate () {
    const la = document.getElementById("lat");
    const lo  = document.getElementById("lon");
    const lat = la.textContent;
    const lon = lo.textContent;
    // Central point (latitude, longitude)
    const center = [lat, lon];
    console.log(center);
    var latitude = null;
    var longitude = null;

    // Loop through the array elements and extract the values
    for (var i = 0; i < center.length; i++) {
      var parts = center[i].split(':'); // Split the string by ':'
      if (parts.length === 2) {
        var key = parts[0].trim(); // Trim any leading/trailing spaces
        var value = parts[1].trim(); // Trim any leading/trailing spaces

        // Check if the key is "Latitude" or "Longitude" and assign the value accordingly
        if (key === 'Latitude') {
          latitude = parseFloat(value);
        } else if (key === 'Longitude') {
        longitude = parseFloat(value);
        }
      }
    }
    console.log(latitude);
    // Radius in meters
    // Radius in kilometers
    const radiusKm = 5000;

    // Calculate bounding box coordinates
    const earthRadiusKm = 6371; // Approximate Earth radius in kilometers

    // Calculate the latitude and longitude differences for the bounding box
    const latDiff = (radiusKm / earthRadiusKm) * (180 / Math.PI);
    const lonDiff = (radiusKm / earthRadiusKm) * (180 / Math.PI) / Math.cos(center[0] * Math.PI / 180);

    // Calculate the minimum and maximum latitude and longitude
    const minLat = latitude - latDiff;
    const maxLat = latitude + latDiff;
    const minLon = longitude - lonDiff;
    const maxLon = longitude + lonDiff;
    return {
        minLatitude: minLat,
        maxLatitude: maxLat,
        minLongitude: minLon,
        maxLongitude: maxLon
    }
}