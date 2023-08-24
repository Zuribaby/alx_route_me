document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("locationSearch");
    const resultsDiv = document.getElementById("map");
    
    locationSearch.addEventListener("click", function () {
      const locationQuery = locationInput.value;
      searchLocation(locationQuery);
    });
  });
  
  function searchLocation(query) {
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({
      q: query,
      format: "json"
    });
  
    fetch(`${baseUrl}?${params}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);
            showLocation(latitude, longitude);
        } else {
            console.log("location unknown");
        }
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });
  }
  
  function showLocation(lat=0, long=0) {
    if (userMarker) {
      map.removeLayer(userMarker);
    }
    map.setView([lat, long], 12);
    userMarker = L.marker([lat, long]).addTo(map);
  }
