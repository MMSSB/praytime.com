let map;
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            map = new google.maps.Map(document.getElementById('map'), {
                center: userLocation,
                zoom: 14
            });

            const marker = new google.maps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location'
            });

            getCityName(userLocation.lat, userLocation.lng);
            findNearbyMasjids(userLocation);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            sidebar.classList.contains('active')) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    function updateDate() {
        const now = new Date();
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    updateDate();
});

function getCityName(latitude, longitude) {
    const cityNameElement = document.getElementById('city-name');
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
            const country = data.address.country || '';
            cityNameElement.textContent = city + (country ? `, ${country}` : '');
        })
        .catch(() => cityNameElement.textContent = 'Location unavailable');
}

function findNearbyMasjids(location) {
    const request = {
        location: location,
        radius: 5000, // 5km radius
        type: 'mosque'
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const masjidList = document.getElementById('masjid-list');
            masjidList.innerHTML = '';
            results.slice(0, 5).forEach(place => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="prayer-name">
                        <span>${place.name}</span>
                    </div>
                    <span>${place.vicinity}</span>
                `;
                masjidList.appendChild(li);

                new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name
                });
            });
        }
    });
}