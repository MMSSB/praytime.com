function updateMapWithLocation(lat, lng, searchTerm) {
  // Initialize the map with user's location
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 15
  });

  // Create a request object for nearby search
  const request = {
    location: { lat: lat, lng: lng },
    radius: 5000, // Search within a 5 km radius
    keyword: searchTerm // Use the search term (e.g., "mosque")
  };

  // Create the Places service and perform a nearby search
  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Clear any existing markers (optional step)
      clearMarkers();

      // Loop through the results and place markers for each mosque
      results.forEach(place => {
        const marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          title: place.name
        });

        // Optionally, add an info window to display place details
        const infowindow = new google.maps.InfoWindow({
          content: `<strong>${place.name}</strong><br>${place.vicinity}`
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    } else {
      alert('No mosques found near your location.');
    }
  });
}

function updateMap() {
  const searchTerm = document.getElementById('search-term').value || 'مسجد';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      updateMapWithLocation(lat, lng, searchTerm);
    }, () => {
      alert('Unable to retrieve your location.');
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// Clear any existing markers on the map (optional function)
function clearMarkers() {
  // Implement marker clearing logic if needed
}

// Initialize the map when the page loads
window.onload = updateMap;
