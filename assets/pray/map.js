function updateMapWithLocation(lat, lng, searchTerm) {
  const radius = 2000; // Search within 2 kilometers
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  const request = {
    location: new google.maps.LatLng(lat, lng),
    radius: radius,
    keyword: searchTerm, // "mosque", "masjid", or "مسجد"
  };

  // Perform a nearby search using the Places API
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // If successful, populate the map with the results
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15,
      });

      // Add markers for each mosque found
      results.forEach(place => {
        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name, // Show the name of the mosque on hover
        });
      });
    } else {
      alert('No mosques found nearby. Please try again later.');
    }
  });
}
