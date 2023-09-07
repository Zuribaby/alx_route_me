/*document.addEventListener("DOMContentLoaded", function () {
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
  const hlon = parseFloat(document.getElementById("lon").value);
  const hlan = parseFloat(document.getElementById("lat").value);
  const coord = getBoundindbox(hlon, hlan);
  console.log(typeof(coord));
  fetch('https://www.overpass-api.de/api/interpreter?', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'utf-8' // Change content type
    },
    body: `[out:json];node(${coord[0]},${coord[1]},${coord[2]},${coord[3]})[tourism=hotel];out;`
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

function getBoundindbox (lat = 0, lon = 0) {
  const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
  const url = `${nominatimEndpoint}/reverse?format=json&lat=${lat}&lon=${lon}`;
    
  fetch(url)
    .then(response => response.json())
    .then(data => {
      return data.boundingbox;
    })
    .catch(error => {
      console.error('Error fetching boundingbox of geocoding data:', error);
    });
}*/
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
  // Get latitude and longitude from input fields
  const hlon = parseFloat(document.getElementById("lon").value);
  const hlat = parseFloat(document.getElementById("lat").value);

  // Fetch the bounding box
  getBoundindbox(hlat, hlon)
    .then((coord) => {
      const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
      const url = `${nominatimEndpoint}/reverse?format=json&lat=${hlat}&lon=${hlon}`;

      // Fetch reverse geocoding data
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const bbox = data.boundingbox;
          const minLatitude = bbox[0];
          const maxLatitude = bbox[1];
          const minLongitude = bbox[2];
          const maxLongitude = bbox[3];

          const overpassApiUrl = 'https://www.overpass-api.de/api/interpreter';

          // Fetch hotels within the bounding box
          fetch(overpassApiUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded', // Correct content type
            },
            body: `[out:json];node(${minLatitude},${minLongitude},${maxLatitude},${maxLongitude})[tourism=hotel];out;`,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              if (data.elements && data.elements.length > 0) {
                // Hotels were found, create markers
                data.elements.forEach(hotel => {
                  const lat = hotel.lat;
                  const lon = hotel.lon;
                  // Create a marker for the hotel
                  map.setView([lat, lon], 12);
                  var hotelMarker = L.marker([lat, lon]).addTo(map);
                });
              } else {
                // No hotels found, display a message
                const noHotelMsg = document.getElementById("info-message");
                const msg = document.getElementById("msg");
                msg.textContent = "No nearby hotels.";
                if (noHotelMsg.style.display !== "block") {
                  noHotelMsg.style.display = "block";
                }
              }
            })
            .catch((error) => {
              console.error('Error fetching hotels:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching boundingbox of geocoding data:', error);
        });
    });
}

//poi for hospitals
function fetchHospitals() {
  // Get latitude and lonlsgitude from input fields
  const hlon = parseFloat(document.getElementById("lon").value);
  const hlat = parseFloat(document.getElementById("lat").value);

  // Fetch the bounding box
  getBoundindbox(hlat, hlon)
    .then((coord) => {
      const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
      const url = `${nominatimEndpoint}/reverse?format=json&lat=${hlat}&lon=${hlon}`;

      // Fetch reverse geocoding data
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const bbox = data.boundingbox;
          const minLatitude = bbox[0];
          const maxLatitude = bbox[1];
          const minLongitude = bbox[2];
          const maxLongitude = bbox[3];

          const overpassApiUrl = 'https://www.overpass-api.de/api/interpreter';

          // Fetch hotels within the bounding box
          fetch(overpassApiUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded', // Correct content type
            },
            body: `[out:json];node(${minLatitude},${minLongitude},${maxLatitude},${maxLongitude})[amenity=hotspital];out;`,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then((data) => {
              console.log(data);
              if (data.elements && data.elements.length > 0) {
                // Hospitals were found, create markers
                data.elements.forEach(hospital => {
                  const lat = hospital.lat;
                  const lon = hospital.lon;
                  // Create a marker for the hospital
                  map.setView([lat, lon], 12);
                  var hospitalMarker = L.marker([lat, lon]).addTo(map);
                });
              } else {
                // No hospitals found, display a message
                const noHospitalMsg = document.getElementById("info-message");
                const msg = document.getElementById("msg");
                msg.textContent = "No nearby hospitals.";
                if (noHospitalMsg.style.display !== "block") {
                  noHospitalMsg.style.display = "block";
                }
              }
            })
            .catch((error) => {
              console.error('Error fetching hotels:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching boundingbox of geocoding data:', error);
        });
    });
}
