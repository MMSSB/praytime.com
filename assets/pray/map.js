function updateMapWithLocation(lat, lng, searchTerm) {
  // Create a Google Map centered at the user's location
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 15,
  });

  // Set up the Places service to search nearby places
  const service = new google.maps.places.PlacesService(map);

  // Define the search request with a radius of 2000 meters (2 km)
  const request = {
    location: { lat: lat, lng: lng },
    radius: 2000, // 2 km radius
    keyword: searchTerm, // The keyword (mosque, masjid, or مسجد)
    type: 'mosque', // Specifically search for mosques
  };

  // Perform the nearby search for mosques
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // If successful, place markers on the map for each mosque found
      results.forEach(place => {
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name, // Mosque name
        });
      });
    } else {
      // Alert the user if no mosques are found nearby
      alert('No mosques found nearby. Please try again later.');
    }
  });
}

function updateMap() {
  const searchTerm = document.getElementById('search-term').value || 'مسجد';

  // Use geolocation to get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      updateMapWithLocation(lat, lng, searchTerm); // Update the map with current location and search term
    }, 
    () => {
      alert('Unable to retrieve your location.');
    }, 
    {
      enableHighAccuracy: true, // Get a more precise location
      timeout: 10000, // Set a timeout for the geolocation request
      maximumAge: 0
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Call updateMap when the page loads to initialize the map
window.onload = updateMap;
