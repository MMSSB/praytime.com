// document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const sidebar = document.getElementById('sidebar');
//     const timesListToday = document.getElementById('times-today');
//     const timesListTomorrow = document.getElementById('times-tomorrow');
//     const cityNameElement = document.getElementById('city-name');
//     const todayButton = document.getElementById('show-today');
//     const tomorrowButton = document.getElementById('show-tomorrow');
//     const currentTimeElement = document.getElementById('current-time');
//     const dateDetailsElement = document.getElementById('date-details');
//     const currentDateElement = document.getElementById('current-date');
//     const islamicDateElement = document.getElementById('islamic-date');
//     const currentPrayerElement = document.getElementById('current-prayer');

//     // Hamburger menu toggle
//     hamburger.addEventListener('click', () => {
//         hamburger.classList.toggle('active');
//         sidebar.classList.toggle('active');
//     });

//     // Close sidebar when clicking outside on mobile
//     document.addEventListener('click', (e) => {
//         if (window.innerWidth <= 768 && 
//             !sidebar.contains(e.target) && 
//             !hamburger.contains(e.target) && 
//             sidebar.classList.contains('active')) {
//             hamburger.classList.remove('active');
//             sidebar.classList.remove('active');
//         }
//     });

//     // Handle window resize
//     window.addEventListener('resize', () => {
//         if (window.innerWidth > 768) {
//             hamburger.classList.remove('active');
//             sidebar.classList.remove('active');
//         }
//     });

//     // Update current time and date
//     function updateCurrentTime() {
//         const now = new Date();
        
//         // Update time
//         currentTimeElement.textContent = now.toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             second: '2-digit',
//             hour12: true
//         });
        
//         // Update date
//         const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
//         const dateStr = now.toLocaleDateString('en-US', dateOptions);
//         dateDetailsElement.textContent = dateStr;
//         currentDateElement.textContent = dateStr;
//     }
    
//     setInterval(updateCurrentTime, 1000);
//     updateCurrentTime();

//     // Get Islamic Date
//     function getIslamicDate(date) {
//         const options = { 
//             calendar: 'islamic',
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric'
//         };
//         return new Intl.DateTimeFormat('en-US-u-ca-islamic', options).format(date);
//     }
    
//     islamicDateElement.textContent = getIslamicDate(new Date());

//     // Handle tab switching
//     todayButton.addEventListener('click', () => {
//         todayButton.classList.add('active');
//         tomorrowButton.classList.remove('active');
//         timesListToday.style.display = 'block';
//         timesListTomorrow.style.display = 'none';
//     });

//     tomorrowButton.addEventListener('click', () => {
//         tomorrowButton.classList.add('active');
//         todayButton.classList.remove('active');
//         timesListToday.style.display = 'none';
//         timesListTomorrow.style.display = 'block';
//     });

//     // Get prayer times if geolocation is available
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             getCityName(latitude, longitude);
//             calculatePrayerTimes(latitude, longitude, new Date(), timesListToday);

//             const tomorrow = new Date();
//             tomorrow.setDate(tomorrow.getDate() + 1);
//             calculatePrayerTimes(latitude, longitude, tomorrow, timesListTomorrow);
            
//             // Setup interval to keep checking current prayer status
//             setInterval(() => {
//                 updateCurrentPrayerStatus(latitude, longitude);
//             }, 30000); // Every 30 seconds
            
//             // Initial check
//             updateCurrentPrayerStatus(latitude, longitude);
            
//         }, (error) => {
//             console.error("Geolocation error:", error);
//             cityNameElement.textContent = 'Location access denied';
//             // Fallback to a default location (Mecca)
//             const meccaLat = 21.4225;
//             const meccaLong = 39.8262;
//             calculatePrayerTimes(meccaLat, meccaLong, new Date(), timesListToday);
            
//             const tomorrow = new Date();
//             tomorrow.setDate(tomorrow.getDate() + 1);
//             calculatePrayerTimes(meccaLat, meccaLong, tomorrow, timesListTomorrow);
//         });
//     } else {
//         cityNameElement.textContent = 'Geolocation not supported';
//         // Fallback to a default location (Mecca)
//         calculatePrayerTimes(21.4225, 39.8262, new Date(), timesListToday);
        
//         const tomorrow = new Date();
//         tomorrow.setDate(tomorrow.getDate() + 1);
//         calculatePrayerTimes(21.4225, 39.8262, tomorrow, timesListTomorrow);
//     }
    
//     // Function to update which prayer is current
// function updateCurrentPrayerStatus(latitude, longitude) {
//     const now = new Date();
//     const params = adhan.CalculationMethod.MuslimWorldLeague();
//     params.madhab = adhan.Madhab.Shafi;
//     const coordinates = new adhan.Coordinates(latitude, longitude);
//     const prayerTimes = new adhan.PrayerTimes(coordinates, now, params);

//     const prayers = [
//         { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
//         { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
//         { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
//         { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
//         { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
//         { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' }
//     ];

//     // let currentPrayer = "After Isha"; // Default if no prayer is current

//     // Loop through prayers to find the current one
//     for (let i = prayers.length - 1; i >= 0; i--) {
//         if (now >= prayers[i].time) {
//             currentPrayer = prayers[i].name;
//             break;
//         }
//     }

//     // Update the DOM to show only the current prayer
//     currentPrayerElement.textContent = `Current: ${currentPrayer}`;
// }
// });

// function calculatePrayerTimes(latitude, longitude, date, timesList) {
//     const params = adhan.CalculationMethod.MuslimWorldLeague();
//     params.madhab = adhan.Madhab.Shafi;
//     const coordinates = new adhan.Coordinates(latitude, longitude);
//     const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

//     const prayers = [
//         { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
//         { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
//         { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
//         { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
//         { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
//         { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' }
//     ];

//     timesList.innerHTML = '';
//     const now = new Date();

//     let nextPrayerIndex = -1;
//     let previousPrayerTime = null;

//     if (date.getDate() === now.getDate() && 
//         date.getMonth() === now.getMonth() && 
//         date.getFullYear() === now.getFullYear()) {
//         for (let i = 0; i < prayers.length; i++) {
//             if (prayers[i].time > now) {
//                 nextPrayerIndex = i;
//                 previousPrayerTime = i > 0 ? prayers[i - 1].time : null;
//                 break;
//             }
//         }
//     }

//     prayers.forEach((prayer, index) => {
//         const li = document.createElement('li');
//         const time = prayer.time.toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//         });

//         let prayerHTML = `
//             <div class="prayer-name">
//                 <span>${prayer.name}</span>
//                 <span class="arabic-name">${prayer.arabicName}</span>
//             </div>
//             <span class="prayer-time">${time}</span>
//         `;

//         if (index === nextPrayerIndex && 
//             date.getDate() === now.getDate() && 
//             date.getMonth() === now.getMonth() && 
//             date.getFullYear() === now.getFullYear()) {
//             li.classList.add('next-prayer');

//             if (previousPrayerTime) {
//                 const totalDuration = prayer.time - previousPrayerTime;
//                 const elapsedTime = now - previousPrayerTime;
//                 const progressPercentage = (elapsedTime / totalDuration) * 100;

//                 prayerHTML += `
//                     <div class="loading-bar">
//                         <div class="progress" style="width: ${progressPercentage}%"></div>
//                     </div>
//                 `;
//             }
//         }

//         li.innerHTML = prayerHTML;
//         timesList.appendChild(li);
//     });

//     if (nextPrayerIndex !== -1 && 
//         date.getDate() === now.getDate() && 
//         date.getMonth() === now.getMonth() && 
//         date.getFullYear() === now.getFullYear()) {
        
//         // Update progress every minute
//         const progressInterval = setInterval(() => {
//             const now = new Date();
//             const nextPrayerTime = prayers[nextPrayerIndex].time;
//             const prevPrayerTime = previousPrayerTime || new Date(now.getFullYear(), now.getMonth(), now.getDate());

//             // Check if we've passed the next prayer time
//             if (now >= nextPrayerTime) {
//                 clearInterval(progressInterval);
//                 // Recalculate the entire day's prayers to update the next prayer indicator
//                 calculatePrayerTimes(latitude, longitude, date, timesList);
//                 return;
//             }

//             const totalDuration = nextPrayerTime - prevPrayerTime;
//             const elapsedTime = now - prevPrayerTime;
//             const progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100);

//             const progressBar = timesList.querySelector('.next-prayer .progress');
//             if (progressBar) {
//                 progressBar.style.width = `${progressPercentage}%`;
//             }
//         }, 60000); // Every minute
//     }
// }

// function getCityName(latitude, longitude) {
//     const cityNameElement = document.getElementById('city-name');
//     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
//         .then(response => response.json())
//         .then(data => {
//             const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
//             const country = data.address.country || '';
//             cityNameElement.textContent = city + (country ? `, ${country}` : '');
//         })
//         .catch(error => {
//             cityNameElement.textContent = 'Location unavailable';
//             console.error('Error fetching location:', error);
//         });
// }

// // Add this at the top of each JS file (after DOMContentLoaded)
// function applyTheme(theme) {
//     const body = document.body;
//     body.classList.remove('light', 'dark');
    
//     if (theme === 'system') {
//         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//             body.classList.add('dark');
//         } else {
//             body.classList.add('light');
//         }
//     } else {
//         body.classList.add(theme);
//     }
// }

// const savedTheme = localStorage.getItem('theme') || 'system';
// applyTheme(savedTheme);

// // Listen for system theme changes
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//     if (localStorage.getItem('theme') === 'system') {
//         applyTheme('system');
//     }
// });




















































document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const timesListToday = document.getElementById('times-today');
    const timesListTomorrow = document.getElementById('times-tomorrow');
    const cityNameElement = document.getElementById('city-name');
    const todayButton = document.getElementById('show-today');
    const tomorrowButton = document.getElementById('show-tomorrow');
    const currentTimeElement = document.getElementById('current-time');
    const dateDetailsElement = document.getElementById('date-details');
    const currentDateElement = document.getElementById('current-date');
    const islamicDateElement = document.getElementById('islamic-date');
    const currentPrayerElement = document.getElementById('current-prayer');

    // Search Elements
    const locationDisplay = document.getElementById('location-display');
    const locationSearch = document.getElementById('location-search');
    const editLocationBtn = document.getElementById('edit-location-btn');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchInput = document.getElementById('city-search-input');
    const searchResults = document.getElementById('search-results');
    const useGpsBtn = document.getElementById('use-gps-btn');
    let searchTimeout;
    let prayerUpdateInterval;

    // --- UI Event Listeners ---

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Close sidebar on outside click (mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            sidebar.classList.contains('active')) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    // Tab switching
    todayButton.addEventListener('click', () => {
        todayButton.classList.add('active');
        tomorrowButton.classList.remove('active');
        timesListToday.style.display = 'grid'; // Changed to grid to match CSS
        timesListTomorrow.style.display = 'none';
    });

    tomorrowButton.addEventListener('click', () => {
        tomorrowButton.classList.add('active');
        todayButton.classList.remove('active');
        timesListToday.style.display = 'none';
        timesListTomorrow.style.display = 'grid';
    });

    // --- Location & Search Logic ---

    // Open Search
    editLocationBtn.addEventListener('click', () => {
        locationDisplay.style.display = 'none';
        locationSearch.style.display = 'block';
        searchInput.focus();
    });

    // Close Search
    closeSearchBtn.addEventListener('click', () => {
        locationSearch.style.display = 'none';
        locationDisplay.style.display = 'flex';
        searchResults.classList.remove('has-results');
        searchResults.innerHTML = '';
        searchInput.value = '';
    });

    // Search Input (Debounced)
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length < 3) {
            searchResults.classList.remove('has-results');
            return;
        }

        searchTimeout = setTimeout(() => {
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    searchResults.innerHTML = '';
                    if (data.length > 0) {
                        searchResults.classList.add('has-results');
                        data.forEach(place => {
                            const li = document.createElement('li');
                            // Clean up the name (take first 3 parts max)
                            const displayName = place.display_name.split(',').slice(0, 3).join(',');
                            li.textContent = displayName;
                            
                            li.addEventListener('click', () => {
                                // Extract simple city name for display
                                const shortName = place.display_name.split(',')[0];
                                selectLocation(parseFloat(place.lat), parseFloat(place.lon), shortName);
                                closeSearchBtn.click();
                            });
                            searchResults.appendChild(li);
                        });
                    } else {
                        searchResults.classList.remove('has-results');
                    }
                })
                .catch(err => console.error("Search error:", err));
        }, 500);
    });

    // Use GPS Button
    useGpsBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            cityNameElement.textContent = "Locating...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Fetch city name for GPS coordinates
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`)
                        .then(res => res.json())
                        .then(data => {
                            const city = data.address.city || data.address.town || data.address.village || 'My Location';
                            selectLocation(lat, lon, city, true);
                        })
                        .catch(() => {
                            selectLocation(lat, lon, "Current Location", true);
                        });
                    
                    closeSearchBtn.click();
                },
                (error) => {
                    alert("Unable to access location. Please enable GPS permissions.");
                    console.error(error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    // --- Core Functions ---

    // 1. Select Location & Trigger Updates
    function selectLocation(lat, lon, name, isGPS = false) {
        // Update UI
        cityNameElement.textContent = name;
        
        // Save to LocalStorage
        const locationData = { lat, lon, name, type: isGPS ? 'gps' : 'manual' };
        localStorage.setItem('savedLocation', JSON.stringify(locationData));

        // Calculate Times
        calculatePrayerTimes(lat, lon, new Date(), timesListToday);
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        calculatePrayerTimes(lat, lon, tomorrow, timesListTomorrow);

        // Update Status immediately and set interval
        updateCurrentPrayerStatus(lat, lon);
        
        if (prayerUpdateInterval) clearInterval(prayerUpdateInterval);
        prayerUpdateInterval = setInterval(() => {
            updateCurrentPrayerStatus(lat, lon);
        }, 30000); // Check every 30s
    }

    // 2. Helper: Get Best Calculation Method (Fixes Fajr)
    function getParamsForLocation(latitude, longitude) {
        // Default: Muslim World League
        let params = adhan.CalculationMethod.MuslimWorldLeague();
        
        // Approx Bounds for Egypt (Fixes Fajr/Isha angles)
        if (latitude >= 22.0 && latitude <= 32.0 && longitude >= 24.0 && longitude <= 37.0) {
            params = adhan.CalculationMethod.Egyptian();
        } 
        // Approx Bounds for North America
        else if (latitude >= 24.0 && latitude <= 72.0 && longitude >= -170.0 && longitude <= -50.0) {
            params = adhan.CalculationMethod.NorthAmerica();
        }
        // Approx Bounds for UK
        else if (latitude >= 50.0 && latitude <= 60.0 && longitude >= -8.0 && longitude <= 2.0) {
             // London Unified/ISNA often used here, or MWL
             // Stick to MWL or specific if needed
        }

        params.madhab = adhan.Madhab.Shafi; // Default to Shafi (Majority)
        return params;
    }

    // 3. Calculate & Render Times
    function calculatePrayerTimes(latitude, longitude, date, timesList) {
        const coordinates = new adhan.Coordinates(latitude, longitude);
        const params = getParamsForLocation(latitude, longitude);
        const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

        const prayers = [
            { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
            { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
            { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
            { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
            { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
            { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' }
        ];

        timesList.innerHTML = '';
        const now = new Date();
        let nextPrayerIndex = -1;
        let previousPrayerTime = null;

        // Determine Next Prayer
        if (date.getDate() === now.getDate() && 
            date.getMonth() === now.getMonth() && 
            date.getFullYear() === now.getFullYear()) {
            
            for (let i = 0; i < prayers.length; i++) {
                if (prayers[i].time > now) {
                    nextPrayerIndex = i;
                    previousPrayerTime = i > 0 ? prayers[i - 1].time : null; // Can be null if Fajr is next
                    break;
                }
            }
            // If no next prayer found today, next is tomorrow's Fajr (not handled here visually for simplicity)
        }

        // Render List
        prayers.forEach((prayer, index) => {
            const li = document.createElement('li');
            const timeStr = prayer.time.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            let prayerHTML = `
                <div class="prayer-name">
                    <span>${prayer.name}</span>
                    <span class="arabic-name">${prayer.arabicName}</span>
                </div>
                <span class="prayer-time">${timeStr}</span>
            `;

            // Highlight Next Prayer and show Progress Bar
            if (index === nextPrayerIndex) {
                li.classList.add('next-prayer');

                if (previousPrayerTime) {
                    // Logic: If there is a previous prayer today, show bar
                    // If Fajr is next, we don't usually show a bar from yesterday's Isha
                    const totalDuration = prayer.time - previousPrayerTime;
                    const elapsedTime = now - previousPrayerTime;
                    const progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100);

                    prayerHTML += `
                        <div class="loading-bar">
                            <div class="progress" style="border-radius: 1.5rem; width: ${progressPercentage}%"></div>
                        </div>
                    `;
                }
            }

            li.innerHTML = prayerHTML;
            timesList.appendChild(li);
        });
    }

    // 4. Update Current Status Text
    function updateCurrentPrayerStatus(latitude, longitude) {
        const now = new Date();
        const coordinates = new adhan.Coordinates(latitude, longitude);
        const params = getParamsForLocation(latitude, longitude);
        const prayerTimes = new adhan.PrayerTimes(coordinates, now, params);
        
        const current = prayerTimes.currentPrayer();
        const next = prayerTimes.nextPrayer();
        
        let prayerName = '';
        
        switch(current) {
            case 'fajr': prayerName = 'Fajr'; break;
            case 'sunrise': prayerName = 'Sunrise'; break;
            case 'dhuhr': prayerName = 'Dhuhr'; break;
            case 'asr': prayerName = 'Asr'; break;
            case 'maghrib': prayerName = 'Maghrib'; break;
            case 'isha': prayerName = 'Isha'; break;
            case 'none': prayerName = 'Isha'; break; // After Isha
        }

        if (prayerName) {
            currentPrayerElement.textContent = `Current: ${prayerName}`;
        } else {
            currentPrayerElement.textContent = `Waiting for Fajr`;
        }
    }

    // --- Clock & Date Utilities ---

    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        dateDetailsElement.textContent = dateStr;
        currentDateElement.textContent = dateStr;
        islamicDateElement.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', {
            day: 'numeric', month: 'long', year: 'numeric'
        }).format(now);
    }
    
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    // --- Theme Logic ---
    function applyTheme(theme) {
        const body = document.body;
        body.classList.remove('light', 'dark');
        if (theme === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) body.classList.add('dark');
            else body.classList.add('light');
        } else {
            body.classList.add(theme);
        }
    }
    
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });

    // --- Initialization ---
    function initApp() {
        // Try loading saved location first
        const saved = localStorage.getItem('savedLocation');
        if (saved) {
            const data = JSON.parse(saved);
            selectLocation(data.lat, data.lon, data.name, data.type === 'gps');
        } else if (navigator.geolocation) {
            // No save? Try GPS automatically
            useGpsBtn.click();
        } else {
            // Fallback (Mecca)
            selectLocation(21.4225, 39.8262, 'Mecca');
        }
    }

    // Start App
    initApp();
});