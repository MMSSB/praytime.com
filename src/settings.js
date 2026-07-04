// // document.addEventListener('DOMContentLoaded', () => {
// //     const hamburger = document.getElementById('hamburger');
// //     const sidebar = document.getElementById('sidebar');
// //     const themeSelect = document.getElementById('theme-select');
// //     const currentDateElement = document.getElementById('current-date');

// //     // Hamburger menu toggle
// //     hamburger.addEventListener('click', () => {
// //         hamburger.classList.toggle('active');
// //         sidebar.classList.toggle('active');
// //     });

// //     // Close sidebar when clicking outside on mobile
// //     document.addEventListener('click', (e) => {
// //         if (window.innerWidth <= 768 && 
// //             !sidebar.contains(e.target) && 
// //             !hamburger.contains(e.target) && 
// //             sidebar.classList.contains('active')) {
// //             hamburger.classList.remove('active');
// //             sidebar.classList.remove('active');
// //         }
// //     });

// //     // Update date
// //     function updateDate() {
// //         const now = new Date();
// //         const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
// //         currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
// //     }
// //     updateDate();

// //     // Theme handling
// //     const savedTheme = localStorage.getItem('theme') || 'system';
// //     themeSelect.value = savedTheme;
// //     applyTheme(savedTheme);

// //     themeSelect.addEventListener('change', (e) => {
// //         const selectedTheme = e.target.value;
// //         localStorage.setItem('theme', selectedTheme);
// //         applyTheme(selectedTheme);
// //     });

// //     function applyTheme(theme) {
// //         const body = document.body;
// //         body.classList.remove('light', 'dark');
        
// //         if (theme === 'system') {
// //             if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
// //                 body.classList.add('dark');
// //             }
// //         } else {
// //             body.classList.add(theme);
// //         }
// //     }

// //     // Listen for system theme changes
// //     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
// //         if (localStorage.getItem('theme') === 'system') {
// //             applyTheme('system');
// //         }
// //     });
// // });






































// document.addEventListener('DOMContentLoaded', () => {
//     // DOM Elements
//     const hamburger = document.getElementById('hamburger');
//     const sidebar = document.getElementById('sidebar');
//     const themeSelect = document.getElementById('theme-select');
//     const currentDateElement = document.getElementById('current-date');
    
//     // Location Elements
//     const citySearchInput = document.getElementById('settings-city-search');
//     const searchResultsList = document.getElementById('settings-search-results');
//     const savedCityText = document.getElementById('saved-city-text');
//     let searchTimeout;

//     // --- Sidebar & Layout Logic ---
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
        
//         // Close search results if clicking outside
//         if (citySearchInput && !citySearchInput.contains(e.target) && !searchResultsList.contains(e.target)) {
//             searchResultsList.style.display = 'none';
//         }
//     });

//     // --- Date Display ---
//     function updateDate() {
//         const now = new Date();
//         const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
//         currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
//     }
//     updateDate();

//     // --- Theme Handling ---
//     const savedTheme = localStorage.getItem('theme') || 'system';
//     themeSelect.value = savedTheme;
//     applyTheme(savedTheme);

//     themeSelect.addEventListener('change', (e) => {
//         const selectedTheme = e.target.value;
//         localStorage.setItem('theme', selectedTheme);
//         applyTheme(selectedTheme);
//     });

//     function applyTheme(theme) {
//         const body = document.body;
//         body.classList.remove('light', 'dark');
        
//         if (theme === 'system') {
//             if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//                 body.classList.add('dark');
//             }
//         } else {
//             body.classList.add(theme);
//         }
//     }

//     // --- NEW: Location Handling ---

//     // 1. Display currently saved location on load
//     function displayCurrentLocation() {
//         // Use the LocationManager we created in locate.js
//         const saved = LocationManager.get();
//         if (saved) {
//             savedCityText.textContent = `${saved.name} ${saved.country ? '(' + saved.country + ')' : ''}`;
//             savedCityText.style.color = 'var(--primary)';
//         } else {
//             savedCityText.textContent = "No default location set (using GPS)";
//             savedCityText.style.color = 'var(--muted-foreground)';
//         }
//     }
//     displayCurrentLocation();

//     // 2. Search Logic (Debounced)
//     citySearchInput.addEventListener('input', (e) => {
//         clearTimeout(searchTimeout);
//         const query = e.target.value.trim();

//         if (query.length < 3) {
//             searchResultsList.style.display = 'none';
//             return;
//         }

//         searchTimeout = setTimeout(() => {
//             // Use OpenStreetMap Nominatim for search
//             fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     searchResultsList.innerHTML = '';
//                     if (data.length > 0) {
//                         searchResultsList.style.display = 'block';
//                         data.forEach(place => {
//                             const li = document.createElement('li');
//                             // Format: "Cairo, Egypt"
//                             const parts = place.display_name.split(',');
//                             const cityName = parts[0];
//                             const countryName = parts[parts.length - 1].trim();
//                             const displayName = parts.slice(0, 3).join(',');

//                             li.textContent = displayName;
                            
//                             li.addEventListener('click', () => {
//                                 // Save using our new central locate.js
//                                 LocationManager.save(
//                                     place.lat, 
//                                     place.lon, 
//                                     cityName, 
//                                     countryName
//                                 );

//                                 // Update UI
//                                 citySearchInput.value = '';
//                                 searchResultsList.style.display = 'none';
//                                 displayCurrentLocation();
                                
//                                 alert(`Default location updated to: ${cityName}`);
//                             });
//                             searchResultsList.appendChild(li);
//                         });
//                     } else {
//                         searchResultsList.style.display = 'none';
//                     }
//                 })
//                 .catch(err => console.error("Search error:", err));
//         }, 500);
//     });
// });


























document.addEventListener('DOMContentLoaded', () => {
    const configElements = {
        theme: document.getElementById('theme-select'),
        timeFormat: document.getElementById('time-format'),
        calcMethod: document.getElementById('calc-method'),
        asrMethod: document.getElementById('asr-method'),
        cityValLabel: document.getElementById('settings-city-val')
    };

    // Initialize values on screen from local storage database
    function initializeFormFields() {
        Object.keys(configElements).forEach(key => {
            if (configElements[key] && key !== 'cityValLabel') {
                const standardFallback = (key === 'theme') ? 'system' : (key === 'timeFormat' ? '12h' : (key === 'calcMethod' ? 'Egyptian' : 'Shafi'));
                configElements[key].value = localStorage.getItem(key) || standardFallback;
            }
        });
        renderCurrentLocationText();
    }

    function renderCurrentLocationText() {
        if (configElements.cityValLabel) {
            const saved = JSON.parse(localStorage.getItem('savedLocation') || '{"name":"El Sheikh Zayed City"}');
            configElements.cityValLabel.textContent = saved.name;
        }
    }

    // Attach native event loops to save modifications immediately
    Object.keys(configElements).forEach(key => {
        if (configElements[key] && key !== 'cityValLabel') {
            configElements[key].addEventListener('change', (e) => {
                localStorage.setItem(key, e.target.value);
            });
        }
    });

    // Listen for custom location changes made through the global search overlay
    window.addEventListener('globalLocationChanged', () => {
        renderCurrentLocationText();
    });

    initializeFormFields();
});