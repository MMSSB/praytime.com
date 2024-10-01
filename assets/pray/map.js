const suggestions = ['mosque', 'masjid', 'مسجد'];

function showSuggestions() {
  const input = document.getElementById('search-term').value.toLowerCase();
  const suggestionsBox = document.getElementById('suggestions');

  // Clear previous suggestions
  suggestionsBox.innerHTML = '';

  if (input) {
    // Filter suggestions based on user input
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().startsWith(input));

    // Display filtered suggestions
    filteredSuggestions.forEach(suggestion => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('suggestion');
      suggestionElement.innerText = suggestion;
      suggestionElement.onclick = () => selectSuggestion(suggestion);
      suggestionsBox.appendChild(suggestionElement);
    });
  }
}

function selectSuggestion(suggestion) {
  // Set the selected suggestion in the input field
  document.getElementById('search-term').value = suggestion;
  // Clear the suggestions box
  document.getElementById('suggestions').innerHTML = '';
  // Trigger the search
  updateMap();
}

function updateMap() {
  // Get the search term from the input field
  const searchTerm = document.getElementById('search-term').value || 'مسجد';

  // Try geolocation first
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Update the map with the accurate position
      updateMapWithLocation(lat, lng, searchTerm);
    }, 
    () => {
      alert('Unable to retrieve your location. Please manually enter your location below.');
      // Show manual input fields when geolocation fails
      document.getElementById('manual-location').style.display = 'block';
    }, 
    {
      enableHighAccuracy: true,  // Attempt to get the most accurate location possible
      timeout: 10000,            // Timeout after 10 seconds
      maximumAge: 0              // Prevent using a cached location
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function updateMapWithLocation(lat, lng, searchTerm) {
  // Update zoom level to focus more on your exact location
  const zoomLevel = 17;

  // Create a Google Maps search query for the specified term
  const query = `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(searchTerm)}&center=${lat},${lng}&zoom=${zoomLevel}&key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao`;

  // Update the iframe src to the Google Maps search query
  document.getElementById('map').src = query;
}

// Function to handle manual location submission
function manualLocation() {
  const lat = document.getElementById('manual-lat').value;
  const lng = document.getElementById('manual-lng').value;
  const searchTerm = document.getElementById('search-term').value || 'مسجد';
  
  // Update the map with the manually entered location
  updateMapWithLocation(lat, lng, searchTerm);
}

// Call the function to initialize the map when the page loads
window.onload = updateMap;
