document.addEventListener("DOMContentLoaded", function () {
  const userLocation = document.querySelectorAll(".my-location");
  const hotelsSearch = document.querySelectorAll(".hotels");
  const hospitalsSearch = document.querySelectorAll(".hospitals");

  userLocation.forEach(function(user) {
    user.addEventListener('click', function () {
      getLocation();;
    });
  });

  hotelsSearch.forEach(function(hotelSearch) {
    hotelSearch.addEventListener('click', function () {
      fetchHotels();
    });
  });

  hospitalsSearch.forEach(function(hospitalSearch) {
    hospitalSearch.addEventListener('click', function () {
      fetchHospitals();
    });
  });
});

/**
 * get and display all hotels found marker within a location bounding box on the map
 * or info message if non is found
 * @returns - Nothing
 */
function fetchHotels() {
  // Get latitude and longitude from input fields
  const hlon = parseFloat(document.getElementById("lon").value);
  const hlat = parseFloat(document.getElementById("lat").value);
  const overpassApiUrl = 'https://www.overpass-api.de/api/interpreter';
  const boundingBox = getBoundingBox();
  boundingBox.then(bbox => {
    console.log(bbox);
    const minLatitude = parseFloat(bbox[0]);
    const maxLatitude = parseFloat(bbox[1]);
    const minLongitude = parseFloat(bbox[2]);
    const maxLongitude = parseFloat(bbox[3]);
    console.log(typeof(parseFloat(bbox[0])));
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
}

/**
 * get and display all hospitals found marker within a location bounding box on the map
 * or info message if non is found
 * @returns - Nothing
 */
function fetchHospitals() {
  // Get latitude and lonlsgitude from input fields
  const hlon = parseFloat(document.getElementById("lon").value);
  const hlat = parseFloat(document.getElementById("lat").value);

  // Fetch the bounding box
  getBoundingBox()
    .then((coord) => {
      const nominatimEndpoint = 'https://nominatim.openstreetmap.org';
      const url = `${nominatimEndpoint}/reverse?format=json&lat=${hlat}&lon=${hlon}`;

      // Fetch reverse geocoding data
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const bbox = data.boundingbox;
          console.log(bbox);
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
