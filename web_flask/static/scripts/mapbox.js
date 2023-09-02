// Replace 'YOUR_MAPBOX_API_KEY' with your actual Mapbox API key

const geolocation = () => {
    if('geolocaton' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
  mapboxgl.accessToken = 'pk.eyJ1IjoicHJvdm9za2kiLCJhIjoiY2xtMDFnZHJwMzA1bjNkcHZ6dmR1NWFmaiJ9.B5dt6Q9SL9INH-c5S74elg';
  const map = new mapboxgl.Map({
    containe: 'map',
    style: 'mapbox://styles/,apbox/street-v2',
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 8
  });
  const m = new mapboxgl.Marker();
  m.setLngLat([position.coords.longitude, position.coords.latitude]);
}

function error() {
    console.log("SOMETHING HAPPEND");
}

window.onload = geolocation;
/*Function to fetch hospitals using Mapbox's Geocoding API
async function fetchHospitalsFromAPI() {
    const location = `${latitude},${longitude}`; // Your location coordinate
    const radius = 5000; // Radius in meters (adjust as needed)
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${location}&radius=${radius}&access_token=${mapboxApiKey}`);
    const data = await response.json();
    return data.features;
}

// Function to add hospitals as markers to the map
async function addHospitalsToMap() {
    const hospitals = await fetchHospitalsFromAPI();
    
    hospitals.forEach(hospital => {
        const [lon, lat] = hospital.center;
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(hospital.text); // Display hospital name on marker click
    });
}

// Call the function to add hospitals to the map
addHospitalsToMap();
*/