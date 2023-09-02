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
    var overpassUrl = 'https://overpass-api.de/api/interpreter';
    var query = '[out:json][timeout:25];(node["amenity"="hotel"](latitude1,longitude1,latitude2,longitude2););out body;>;out skel qt;';
    query = query.replace(/latitude1/g, coord.minLatitude)
                 .replace(/longitude1/g, coord.minLongitude)
                 .replace(/latitude2/g, coord.maxLatitude)
                 .replace(/longitude2/g, coord.maxLongitude);
    fetch(overpassUrl, {
      method: 'POST',
      body: query
    })          
    .then(response => response.json())
    .then(data => {
        // Loop through features and create markers for hospitals
        console.log(data);
        data.elements.forEach(hotel => {
            const lat = hotel.lat;
            const lon = hotel.lon;
            // Create a marker for the hospital
            //showAmenity(lat, lon);
            var hotelsMarker = L.marker([lat, lon]).addTo(map).bindPopup("hotel");
        });
    })
    .catch(error => console.error(error));
}

function fetchHospitals() {
    const coord = getcoordinate();
    console.log(coord.minLatitude);
    var overpassUrl = 'https://overpass-api.de/api/interpreter';
    var query = '[out:json][timeout:25];(node["amenity"="hospital"](latitude1,longitude1,latitude2,longitude2););out body;>;out skel qt;';
    query = query.replace(/latitude1/g, coord.minLatitude)
                 .replace(/longitude1/g, coord.minLongitude)
                 .replace(/latitude2/g, coord.maxLatitude)
                 .replace(/longitude2/g, coord.maxLongitude);
    fetch(overpassUrl, {
      method: 'POST',
      body: query
    })          
    .then(response => response.json())
    .then(data => {
        // Loop through features and create markers for hospitals
        console.log(data);
        data.elements.forEach(hospital => {
            const lat = hospital.lat;
            const lon = hospital.lon;
            // Create a marker for the hospital
            //showAmenity(lat, lon);
            var hospitalMarker = L.marker([lat, lon]).addTo(map).bindPopup("hospital");
        });
    })
    .catch(error => console.error(error));
}

function getcoordinate () {
    const la = document.getElementById("lat");
    const lo  = document.getElementById("lon");
    const lat = la.textContent;
    const lon = lo.textContent;
    console.log(lat);
    console.log(lon);
    // Central point (latitude, longitude)
    const center = [parseFloat(lat), parseFloat(lon)];
    console.log(center);

    // Radius in meters
    // Radius in kilometers
    const radiusKm = 5;

    // Calculate bounding box coordinates
    const earthRadiusKm = 6371; // Approximate Earth radius in kilometers

    // Calculate the latitude and longitude differences for the bounding box
    const latDiff = (radiusKm / earthRadiusKm) * (180 / Math.PI);
    const lonDiff = (radiusKm / earthRadiusKm) * (180 / Math.PI) / Math.cos(center[0] * Math.PI / 180);

    // Calculate the minimum and maximum latitude and longitude
    const minLat = center[0] - latDiff;
    const maxLat = center[0] + latDiff;
    const minLon = center[1] - lonDiff;
    const maxLon = center[1] + lonDiff;
    return {
        minLatitude: minLat,
        maxLatitude: maxLat,
        minLongitude: minLon,
        maxLongitude: maxLon
    }
}