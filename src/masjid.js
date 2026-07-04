// let map;
// function initMap() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const userLocation = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
            
//             map = new google.maps.Map(document.getElementById('map'), {
//                 center: userLocation,
//                 zoom: 14
//             });

//             const marker = new google.maps.Marker({
//                 position: userLocation,
//                 map: map,
//                 title: 'Your Location'
//             });

//             getCityName(userLocation.lat, userLocation.lng);
//             findNearbyMasjids(userLocation);
//         });
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const sidebar = document.getElementById('sidebar');
//     const currentDateElement = document.getElementById('current-date');

//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('active');
//         sidebar.classList.toggle('active');
//     });

//     document.addEventListener('click', (e) => {
//         if (window.innerWidth <= 768 && 
//             !sidebar.contains(e.target) && 
//             !hamburger.contains(e.target) && 
//             sidebar.classList.contains('active')) {
//             hamburger.classList.remove('active');
//             sidebar.classList.remove('active');
//         }
//     });

//     function updateDate() {
//         const now = new Date();
//         const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
//         currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
//     }
//     updateDate();
// });

// function getCityName(latitude, longitude) {
//     const cityNameElement = document.getElementById('city-name');
//     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
//         .then(response => response.json())
//         .then(data => {
//             const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
//             const country = data.address.country || '';
//             cityNameElement.textContent = city + (country ? `, ${country}` : '');
//         })
//         .catch(() => cityNameElement.textContent = 'Location unavailable');
// }

// function findNearbyMasjids(location) {
//     const request = {
//         location: location,
//         radius: 5000, // 5km radius
//         type: 'mosque'
//     };

//     const service = new google.maps.places.PlacesService(map);
//     service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             const masjidList = document.getElementById('masjid-list');
//             masjidList.innerHTML = '';
//             results.slice(0, 5).forEach(place => {
//                 const li = document.createElement('li');
//                 li.innerHTML = `
//                     <div class="prayer-name">
//                         <span>${place.name}</span>
//                     </div>
//                     <span>${place.vicinity}</span>
//                 `;
//                 masjidList.appendChild(li);

//                 new google.maps.Marker({
//                     position: place.geometry.location,
//                     map: map,
//                     title: place.name
//                 });
//             });
//         }
//     });
// }























document.addEventListener('DOMContentLoaded', () => {
    // --- Core View DOM Nodes Mapping ---
    const cityNameElement = document.getElementById('city-name');
    const mapsIframe = document.getElementById('google-maps-iframe');
    const viewLargeBtn = document.getElementById('view-large-btn');
    const recenterBtn = document.getElementById('recenter-btn');
    const listContainer = document.getElementById('mosque-list-container');

    // Haversine geodesic translation metric algorithm helper
    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's Mean Radius in Kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
        return R * c;
    }

    // --- Main Rendering Engine ---
    function bootstrapMasjidFinder() {
        const saved = JSON.parse(localStorage.getItem('savedLocation') || '{"lat":30.0167,"lon":30.9833,"name":"El Sheikh Zayed City"}');
        
        if (cityNameElement) cityNameElement.textContent = saved.name;
        if (!mapsIframe || !listContainer) return;

        // Build premium Google Maps query matrix
        const searchQuery = `masjid mosque near ${saved.lat},${saved.lon}`;
        const encodedQuery = encodeURIComponent(searchQuery);
        
        mapsIframe.src = `https://maps.google.com/maps?q=${encodedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
        if (viewLargeBtn) viewLargeBtn.href = `https://maps.google.com/maps?q=${encodedQuery}`;
        
        fetchNearbyMosques(saved.lat, saved.lon);
    }

    // --- Overpass OpenStreetMap Execution Hook ---
    async function fetchNearbyMosques(lat, lon) {
        listContainer.innerHTML = `
            <div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
                <i class="ph ph-spinner ph-spin" style="font-size: 2rem;"></i>
                <p style="margin-top: 12px; font-weight: 500;">Locating nearby masjids...</p>
            </div>
        `;

        const radiusMeters = 5000; // 5 Kilometers operational boundaries radius
        const query = `
            [out:json][timeout:25];
            (
              node["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${lat},${lon});
              way["amenity"="place_of_worship"]["religion"="muslim"](around:${radiusMeters},${lat},${lon});
            );
            out center;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Data cluster extraction error");
            const data = await response.json();

            if (!data.elements || data.elements.length === 0) {
                listContainer.innerHTML = `
                    <div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
                        <i class="ph ph-warning-circle" style="font-size: 2rem; color: var(--accent);"></i>
                        <p style="margin-top: 12px; font-weight: 500;">No mosques found within 5km of this location.</p>
                    </div>
                `;
                return;
            }

            // Map and calculate exact walking intervals
            let places = data.elements.map(item => {
                const itemLat = item.lat || item.center.lat;
                const itemLon = item.lon || item.center.lon;
                const distance = getDistance(lat, lon, itemLat, itemLon);
                const name = item.tags.name || item.tags['name:en'] || "Mosque (Unnamed)";
                return { name, distance, lat: itemLat, lon: itemLon };
            });

            // Sort arrays securely ascending by distance
            places.sort((a, b) => a.distance - b.distance);

            listContainer.innerHTML = '';
            
            // Limit array compilation context payload to top 12 elements
            places.slice(0, 12).forEach(mosque => {
                const metricLabel = mosque.distance < 1 
                    ? `${Math.round(mosque.distance * 1000)} m` 
                    : `${mosque.distance.toFixed(1)} km`;
                
                const structuralNavigationURL = `https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lon}&origin=${lat},${lon}`;
                const card = document.createElement('div');
                card.className = 'mosque-card';
                
                card.innerHTML = `
                    <div class="mosque-title">${mosque.name}</div>
                    <div class="mosque-meta">
                        <span class="mosque-distance"><i class="ph ph-navigation-arrow"></i> ${metricLabel}</span>
                    </div>
                    <a href="${structuralNavigationURL}" target="_blank" class="btn-directions">
                        <i class="ph ph-map-trifold"></i> Get Directions
                    </a>
                `;
                listContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Overpass operational pipeline exception:", error);
            listContainer.innerHTML = `
                <div style="text-align: center; color: var(--text-muted); padding: 3rem 0;">
                    <i class="ph ph-x-circle" style="font-size: 2rem; color: #ef4444;"></i>
                    <p style="margin-top: 12px; font-weight: 500;">Failed to load data elements.</p>
                </div>
            `;
        }
    }

    // --- Interactive Event Listeners Hooks ---
    if (recenterBtn) {
        recenterBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                const standardIcons = recenterBtn.innerHTML;
                recenterBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i>';
                
                navigator.geolocation.getCurrentPosition((pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    
                    // Push coordinates matrix globally over execution lines
                    localStorage.setItem('savedLocation', JSON.stringify({ lat, lon, name: "Current Location", type: 'gps' }));
                    window.dispatchEvent(new CustomEvent('globalLocationChanged', { detail: { lat, lon, name: "Current Location" } }));
                    recenterBtn.innerHTML = standardIcons;
                }, () => {
                    alert("GPS permissions access denied or timed out.");
                    recenterBtn.innerHTML = standardIcons;
                });
            }
        });
    }

    // Sync views securely when standard global modal inputs update state parameters
    window.addEventListener('globalLocationChanged', bootstrapMasjidFinder);
    
    bootstrapMasjidFinder();
});