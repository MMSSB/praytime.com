
// document.addEventListener('DOMContentLoaded', () => {
//     // --- DOM Elements ---
//     const hamburger = document.querySelector('.hamburger');
//     const sidebar = document.querySelector('.sidebar');
    
//     // Search Elements
//     const citySearch = document.getElementById('city-search');
//     const searchBtn = document.getElementById('search-btn');
//     const searchResults = document.getElementById('search-results');
//     const useCurrentLocationBtn = document.getElementById('use-current-location');
    
//     // Weather Display Elements
//     const weatherCity = document.getElementById('weather-city');
//     const lastUpdated = document.getElementById('last-updated');
//     const weatherIcon = document.getElementById('weather-icon');
//     const currentTemp = document.getElementById('current-temp');
//     const weatherDesc = document.getElementById('weather-desc');
//     const feelsLike = document.getElementById('feels-like');
//     const humidity = document.getElementById('humidity');
//     const wind = document.getElementById('wind');
//     const pressure = document.getElementById('pressure');
    
//     // Containers
//     const hourlyContainer = document.getElementById('hourly-container');
//     const dailyContainer = document.getElementById('daily-container');
//     const airQualityContainer = document.getElementById('air-quality-container');
//     const currentDate = document.getElementById('current-date');
    
//     // Variables
//     let temperatureChart;
//     let precipitationChart;
//     let searchTimeout; // For debouncing

//     // --- Sidebar Logic ---
//     if (hamburger && sidebar) {
//         hamburger.addEventListener('click', () => {
//             hamburger.classList.toggle('active');
//             sidebar.classList.toggle('active');
//         });

//         document.addEventListener('click', (e) => {
//             if (window.innerWidth <= 768 && 
//                 !sidebar.contains(e.target) && 
//                 !hamburger.contains(e.target) && 
//                 sidebar.classList.contains('active')) {
//                 hamburger.classList.remove('active');
//                 sidebar.classList.remove('active');
//             }
            
//             // Close search results if clicking outside
//             if (!citySearch.contains(e.target) && !searchResults.contains(e.target)) {
//                 searchResults.classList.remove('has-results');
//             }
//         });
//     }

//     // --- Date Display ---
//     function updateCurrentDate() {
//         const now = new Date();
//         currentDate.textContent = now.toLocaleDateString('en-US', {
//             weekday: 'long',
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     }
//     updateCurrentDate();

//     // --- Chart Initialization ---
//     function initCharts() {
//         const tempCtx = document.getElementById('temperature-chart').getContext('2d');
//         const precipCtx = document.getElementById('precipitation-chart').getContext('2d');
        
//         // Define common chart options
//         const commonOptions = {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: { legend: { position: 'top' } },
//             scales: { y: { beginAtZero: false } }
//         };

//         temperatureChart = new Chart(tempCtx, {
//             type: 'line',
//             data: {
//                 labels: [],
//                 datasets: [
//                     {
//                         label: 'Temperature (°C)',
//                         data: [],
//                         borderColor: '#e63946',
//                         backgroundColor: 'rgba(230, 57, 70, 0.1)',
//                         tension: 0.3,
//                         fill: true
//                     },
//                     {
//                         label: 'Feels Like (°C)',
//                         data: [],
//                         borderColor: '#457b9d',
//                         backgroundColor: 'rgba(69, 123, 157, 0.1)',
//                         tension: 0.3,
//                         fill: true
//                     }
//                 ]
//             },
//             options: commonOptions
//         });

//         precipitationChart = new Chart(precipCtx, {
//             type: 'bar',
//             data: {
//                 labels: [],
//                 datasets: [
//                     {
//                         label: 'Precipitation (mm)',
//                         data: [],
//                         backgroundColor: '#1d3557',
//                         borderColor: '#1d3557',
//                         borderWidth: 1
//                     },
//                     {
//                         label: 'Chance of Rain (%)',
//                         data: [],
//                         backgroundColor: '#a8dadc',
//                         borderColor: '#a8dadc',
//                         borderWidth: 1,
//                         type: 'line',
//                         yAxisID: 'y1'
//                     }
//                 ]
//             },
//             options: {
//                 ...commonOptions,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: { display: true, text: 'Precipitation (mm)' }
//                     },
//                     y1: {
//                         position: 'right',
//                         beginAtZero: true,
//                         max: 100,
//                         grid: { drawOnChartArea: false },
//                         title: { display: true, text: 'Chance of Rain (%)' }
//                     }
//                 }
//             }
//         });
//     }
//     initCharts();

//     // --- Search & Suggestions Logic (New) ---

//     // Input Event: Fetch Suggestions
//     citySearch.addEventListener('input', (e) => {
//         clearTimeout(searchTimeout);
//         const query = e.target.value.trim();

//         if (query.length < 3) {
//             searchResults.classList.remove('has-results');
//             searchResults.innerHTML = '';
//             return;
//         }

//         searchTimeout = setTimeout(() => {
//             fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     searchResults.innerHTML = '';
//                     if (data.length > 0) {
//                         searchResults.classList.add('has-results');
//                         data.forEach(place => {
//                             const li = document.createElement('li');
//                             // Format name neatly
//                             const displayName = place.display_name.split(',').slice(0, 3).join(',');
//                             li.textContent = displayName;
                            
//                             li.addEventListener('click', () => {
//                                 // Update Input
//                                 const shortName = place.display_name.split(',')[0];
//                                 citySearch.value = shortName;
                                
//                                 // Hide List
//                                 searchResults.classList.remove('has-results');
                                
//                                 // Fetch Weather
//                                 fetchAndDisplayWeather(place.lat, place.lon, {
//                                     name: shortName,
//                                     country: getCountryFromDisplayName(place.display_name)
//                                 });
//                             });
//                             searchResults.appendChild(li);
//                         });
//                     } else {
//                         searchResults.classList.remove('has-results');
//                     }
//                 })
//                 .catch(err => console.error("Search error:", err));
//         }, 500); // 500ms delay
//     });

//     // Helper to extract country roughly
//     function getCountryFromDisplayName(displayName) {
//         const parts = displayName.split(',');
//         return parts[parts.length - 1].trim();
//     }

//     // Manual Search Button Click
//     searchBtn.addEventListener('click', () => {
//         if (citySearch.value.trim()) {
//             // Fallback to direct search if they ignore suggestions and click button
//             performDirectSearch(citySearch.value.trim());
//         }
//     });

//     citySearch.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter' && citySearch.value.trim()) {
//             searchResults.classList.remove('has-results');
//             performDirectSearch(citySearch.value.trim());
//         }
//     });

//     async function performDirectSearch(cityName) {
//          try {
//             const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
//             const data = await response.json();
            
//             if (data.results && data.results.length > 0) {
//                 const city = data.results[0];
//                 fetchAndDisplayWeather(city.latitude, city.longitude, { name: city.name, country: city.country });
//             } else {
//                 alert('City not found. Please try selecting from the suggestions.');
//             }
//         } catch (error) {
//             console.error('Error searching:', error);
//         }
//     }


//     // --- Weather Data Fetching ---

//     async function fetchAndDisplayWeather(lat, lon, locationInfo = null) {
//         // Show loading state if needed
//         weatherCity.textContent = "Loading...";
        
//         try {
//             // 1. Fetch Weather & Air Quality
//             const weatherParams = 'current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,weathercode,surface_pressure,windspeed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto';
//             const weatherResponse = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${weatherParams}`);
            
//             const airQualityParams = 'current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone';
//             const airQualityResponse = fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&${airQualityParams}`);

//             // 2. Fetch Location Name (if missing)
//             let locationResponsePromise = Promise.resolve(null);
//             if (!locationInfo) {
//                 locationResponsePromise = fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
//             }

//             // 3. Wait for all
//             const [weatherRes, airQualityRes, locRes] = await Promise.all([weatherResponse, airQualityResponse, locationResponsePromise]);

//             if (!weatherRes.ok || !airQualityRes.ok) throw new Error('API Error');

//             const weatherData = await weatherRes.json();
//             const airQualityData = await airQualityRes.json();
            
//             let finalLocation = locationInfo;
//             if (!finalLocation && locRes) {
//                 const locData = await locRes.json();
//                 finalLocation = {
//                     name: locData.address.city || locData.address.town || locData.address.village || 'Unknown',
//                     country: locData.address.country || ''
//                 };
//             }

//             // 4. Update UI
//             updateWeatherUI({
//                 weather: weatherData,
//                 airQuality: airQualityData,
//                 location: finalLocation
//             });

//         } catch (error) {
//             console.error('Fetch error:', error);
//             weatherCity.textContent = "Error loading data";
//         }
//     }

//     // --- UI Update Functions ---

//     function updateWeatherUI(data) {
//         const { weather, airQuality, location } = data;
//         const current = weather.current;
//         const hourly = weather.hourly;
//         const daily = weather.daily;

//         // Header Info
//         weatherCity.textContent = `${location.name}, ${location.country}`;
//         lastUpdated.textContent = `Updated: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
//         // Current Weather Status
//         const { description, iconPath } = getWeatherIcon(current.weathercode, current.is_day);
//         weatherIcon.innerHTML = `<img src="${iconPath}" alt="${description}">`;
        
//         currentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;
//         weatherDesc.textContent = description;
//         feelsLike.textContent = `Feels like: ${Math.round(current.apparent_temperature)}°C`;
//         humidity.textContent = `Humidity: ${current.relativehumidity_2m}%`;
//         wind.textContent = `Wind: ${Math.round(current.windspeed_10m)} km/h`;
//         pressure.textContent = `Pressure: ${Math.round(current.surface_pressure)} hPa`;
        
//         // Hourly Forecast
//         hourlyContainer.innerHTML = '';
//         const currentHour = new Date().getHours();
        
//         // Only show next 24 hours
//         for (let i = 0; i < 24; i++) {
//             const timeStr = hourly.time[i];
//             const dateObj = new Date(timeStr);
//             const hour = dateObj.getHours();
//             const { description: hDesc, iconPath: hIcon } = getWeatherIcon(hourly.weathercode[i], hourly.is_day[i]);

//             const div = document.createElement('div');
//             div.className = 'hourly-item';
//             if (hour === currentHour) div.classList.add('active');
            
//             div.innerHTML = `
//                 <div class="hourly-time">${hour}:00</div>
//                 <div class="hourly-icon"><img src="${hIcon}" alt="${hDesc}"></div>
//                 <div class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°</div>
//             `;
//             hourlyContainer.appendChild(div);
//         }
        
//         // Daily Forecast
//         dailyContainer.innerHTML = '';
//         const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
//         daily.time.forEach((t, i) => {
//             const d = new Date(t);
//             const dayName = i === 0 ? 'Today' : dayNames[d.getUTCDay()]; // Use UTC to avoid timezone shift issues on daily dates
//             const { description: dDesc, iconPath: dIcon } = getWeatherIcon(daily.weathercode[i], 1); // Always day icon

//             const div = document.createElement('div');
//             div.className = 'daily-item';
//             div.innerHTML = `
//                 <div class="daily-day">${dayName}</div>
//                 <div class="daily-icon"><img src="${dIcon}" alt="${dDesc}"></div>
//                 <div class="daily-temps">
//                     <span class="daily-high">${Math.round(daily.temperature_2m_max[i])}°</span>
//                     <span class="daily-low">${Math.round(daily.temperature_2m_min[i])}°</span>
//                 </div>
//             `;
//             dailyContainer.appendChild(div);
//         });
        
//         updateCharts(hourly);
//         updateAirQuality(airQuality.current);
//     }

//     function updateCharts(hourly) {
//         const labels = hourly.time.slice(0, 24).map(t => new Date(t).getHours() + ':00');
        
//         // Update Temperature Chart
//         temperatureChart.data.labels = labels;
//         temperatureChart.data.datasets[0].data = hourly.temperature_2m.slice(0, 24);
//         temperatureChart.data.datasets[1].data = hourly.apparent_temperature.slice(0, 24);
//         temperatureChart.update();
        
//         // Update Precip Chart
//         precipitationChart.data.labels = labels;
//         precipitationChart.data.datasets[0].data = hourly.precipitation.slice(0, 24);
//         precipitationChart.data.datasets[1].data = hourly.precipitation_probability.slice(0, 24);
//         precipitationChart.update();
//     }

//     function updateAirQuality(aqData) {
//         if (!aqData || aqData.us_aqi === null) {
//             airQualityContainer.innerHTML = '<p>Air quality data unavailable.</p>';
//             return;
//         }

//         const aqi = Math.round(aqData.us_aqi);
//         let level = 'Good', color = '#28a745', desc = 'Air quality is satisfactory.';

//         if (aqi > 50) { level = 'Moderate'; color = '#ffc107'; desc = 'Acceptable quality.'; }
//         if (aqi > 100) { level = 'Unhealthy for Sensitive Groups'; color = '#fd7e14'; desc = 'Sensitive groups may suffer.'; }
//         if (aqi > 150) { level = 'Unhealthy'; color = '#dc3545'; desc = 'General public may suffer.'; }
//         if (aqi > 200) { level = 'Very Unhealthy'; color = '#6f42c1'; desc = 'Health alert.'; }
//         if (aqi > 300) { level = 'Hazardous'; color = '#343a40'; desc = 'Emergency conditions.'; }

//         airQualityContainer.innerHTML = `
//             <div class="aqi-value" style="color: ${color}">${aqi}</div>
//             <div class="aqi-level">${level}</div>
//             <div class="aqi-description">${desc}</div>
//             <div class="aqi-components">
//                 ${renderAQComponent('PM2.5', aqData.pm2_5)}
//                 ${renderAQComponent('PM10', aqData.pm10)}
//                 ${renderAQComponent('NO₂', aqData.nitrogen_dioxide)}
//                 ${renderAQComponent('O₃', aqData.ozone)}
//             </div>
//         `;
//     }

//     function renderAQComponent(name, value) {
//         if (value === null || value === undefined) return '';
//         return `<div class="aqi-component">
//                     <span class="aqi-component-name">${name}</span>
//                     <span class="aqi-component-value">${value.toFixed(1)}</span>
//                 </div>`;
//     }

//     // Weather Codes (WMO)
//     function getWeatherIcon(code, isDay) {
//         const prefix = 'svg/'; // Ensure this path matches your folder structure
//         let desc = 'Unknown', icon = 'wi-na.svg';

//         switch (code) {
//             case 0: desc = 'Clear sky'; icon = isDay ? 'wi-day-sunny.svg' : 'wi-night-clear.svg'; break;
//             case 1: desc = 'Mainly clear'; icon = isDay ? 'wi-day-sunny-overcast.svg' : 'wi-night-alt-partly-cloudy.svg'; break;
//             case 2: desc = 'Partly cloudy'; icon = isDay ? 'wi-day-cloudy.svg' : 'wi-night-alt-cloudy.svg'; break;
//             case 3: desc = 'Overcast'; icon = 'wi-cloudy.svg'; break;
//             case 45: case 48: desc = 'Fog'; icon = 'wi-fog.svg'; break;
//             case 51: case 53: case 55: desc = 'Drizzle'; icon = 'wi-sprinkle.svg'; break;
//             case 61: case 63: case 65: desc = 'Rain'; icon = 'wi-rain.svg'; break;
//             case 71: case 73: case 75: desc = 'Snow'; icon = 'wi-snow.svg'; break;
//             case 95: case 96: case 99: desc = 'Thunderstorm'; icon = 'wi-thunderstorm.svg'; break;
//         }
//         return { description: desc, iconPath: prefix + icon };
//     }

//     // --- Geolocation & Init ---

//     useCurrentLocationBtn.addEventListener('click', () => {
//         if (navigator.geolocation) {
//             weatherCity.textContent = "Locating...";
//             navigator.geolocation.getCurrentPosition(
//                 pos => fetchAndDisplayWeather(pos.coords.latitude, pos.coords.longitude),
//                 err => {
//                     alert('Location access denied.');
//                     weatherCity.textContent = "Location Denied";
//                 }
//             );
//         } else {
//             alert('Geolocation not supported.');
//         }
//     });

//     function init() {
//         // Try saved location from PrayTime app (if they share localStorage)
//         const saved = localStorage.getItem('savedLocation');
//         if (saved) {
//             const data = JSON.parse(saved);
//             fetchAndDisplayWeather(data.lat, data.lon, { name: data.name, country: '' });
//         } else if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 pos => fetchAndDisplayWeather(pos.coords.latitude, pos.coords.longitude),
//                 () => fetchAndDisplayWeather(30.0444, 31.2357, { name: 'Cairo', country: 'Egypt' })
//             );
//         } else {
//             fetchAndDisplayWeather(30.0444, 31.2357, { name: 'Cairo', country: 'Egypt' });
//         }
//     }

//     init();
// });
































document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const weatherCity = document.getElementById('weather-city');
    const lastUpdated = document.getElementById('last-updated');
    const weatherIcon = document.getElementById('weather-icon');
    const currentTemp = document.getElementById('current-temp');
    const weatherDesc = document.getElementById('weather-desc');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const pressure = document.getElementById('pressure');
    
    const hourlyContainer = document.getElementById('hourly-container');
    const dailyContainer = document.getElementById('daily-container');
    const airQualityContainer = document.getElementById('air-quality-container');
    
    let temperatureChart;
    let precipitationChart;

    // --- Chart Initialization ---
    function initCharts() {
        const tempCtx = document.getElementById('temperature-chart').getContext('2d');
        const precipCtx = document.getElementById('precipitation-chart').getContext('2d');
        
        // CSS Variable color extractors for charts to match themes
        const textColor = getComputedStyle(document.body).getPropertyValue('--text-main').trim() || '#000';
        const gridColor = getComputedStyle(document.body).getPropertyValue('--border-color').trim() || '#eee';

        const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            color: textColor,
            plugins: { legend: { position: 'top', labels: { color: textColor } } },
            scales: { 
                x: { grid: { color: gridColor }, ticks: { color: textColor } },
                y: { grid: { color: gridColor }, ticks: { color: textColor }, beginAtZero: false } 
            }
        };

        temperatureChart = new Chart(tempCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    { label: 'Temp (°C)', data: [], borderColor: '#ff6b6b', backgroundColor: 'rgba(255, 107, 107, 0.1)', tension: 0.3, fill: true },
                    { label: 'Feels (°C)', data: [], borderColor: '#4ecdc4', backgroundColor: 'rgba(78, 205, 196, 0.1)', tension: 0.3, fill: true }
                ]
            },
            options: commonOptions
        });

        precipitationChart = new Chart(precipCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    { label: 'Precip (mm)', data: [], backgroundColor: '#1d3557', borderRadius: 4 },
                    { label: 'Chance (%)', data: [], backgroundColor: '#a8dadc', type: 'line', yAxisID: 'y1', tension: 0.3 }
                ]
            },
            options: {
                ...commonOptions,
                scales: {
                    x: commonOptions.scales.x,
                    y: { ...commonOptions.scales.y, beginAtZero: true },
                    y1: { position: 'right', beginAtZero: true, max: 100, grid: { drawOnChartArea: false }, ticks: { color: textColor } }
                }
            }
        });
    }

    // --- Fetch Data from APIs ---
    async function fetchAndDisplayWeather(lat, lon, locationName) {
        if (weatherCity) weatherCity.textContent = "Fetching Forecast...";
        
        try {
            const weatherParams = 'current=temperature_2m,relativehumidity_2m,apparent_temperature,is_day,weathercode,surface_pressure,windspeed_10m&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto';
            const weatherResponse = fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${weatherParams}`);
            const airQualityParams = 'current=us_aqi,pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone';
            const airQualityResponse = fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&${airQualityParams}`);

            const [weatherRes, airQualityRes] = await Promise.all([weatherResponse, airQualityResponse]);

            if (!weatherRes.ok) throw new Error('Weather API Error');
            
            const weatherData = await weatherRes.json();
            const airQualityData = airQualityRes.ok ? await airQualityRes.json() : null;

            updateWeatherUI({ weather: weatherData, airQuality: airQualityData, locationName });

        } catch (error) {
            console.error('Fetch error:', error);
            if (weatherCity) weatherCity.textContent = locationName || "Location Error";
            if (weatherDesc) weatherDesc.textContent = "Unable to load data.";
        }
    }

    // --- Core UI Updater ---
    function updateWeatherUI(data) {
        const { weather, airQuality, locationName } = data;
        const current = weather.current;
        const hourly = weather.hourly;
        const daily = weather.daily;

        // 1. Current
        if (weatherCity) weatherCity.textContent = locationName || 'Current Location';
        if (lastUpdated) lastUpdated.textContent = `Updated: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        const { description, iconPath } = getWeatherIcon(current.weathercode, current.is_day);
        if (weatherIcon) weatherIcon.innerHTML = `<img src="${iconPath}" alt="${description}">`;
        
        if (currentTemp) currentTemp.textContent = `${Math.round(current.temperature_2m)}°`;
        if (weatherDesc) weatherDesc.textContent = description;
        if (feelsLike) feelsLike.textContent = `Feels: ${Math.round(current.apparent_temperature)}°`;
        if (humidity) humidity.textContent = `Humidity: ${current.relativehumidity_2m}%`;
        if (wind) wind.textContent = `Wind: ${Math.round(current.windspeed_10m)} km/h`;
        if (pressure) pressure.textContent = `Press: ${Math.round(current.surface_pressure)} hPa`;
        
        // 2. Hourly
        if (hourlyContainer) {
            hourlyContainer.innerHTML = '';
            const currentHour = new Date().getHours();
            const is12Hour = (localStorage.getItem('timeFormat') || '12h') === '12h';
            
            for (let i = 0; i < 24; i++) {
                const timeObj = new Date(hourly.time[i]);
                const hour = timeObj.getHours();
                
                let displayHour = `${hour}:00`;
                if (is12Hour) {
                    const ampm = hour >= 12 ? 'PM' : 'AM';
                    const h12 = hour % 12 || 12;
                    displayHour = `${h12} ${ampm}`;
                }

                const { iconPath: hIcon } = getWeatherIcon(hourly.weathercode[i], hourly.is_day[i]);
                const div = document.createElement('div');
                div.className = 'hourly-item';
                if (hour === currentHour && i < 12) div.classList.add('active'); 
                
                div.innerHTML = `
                    <div class="hourly-time">${displayHour}</div>
                    <img src="${hIcon}" alt="icon">
                    <div class="hourly-temp">${Math.round(hourly.temperature_2m[i])}°</div>
                `;
                hourlyContainer.appendChild(div);
            }
        }
        
        // 3. Daily
        if (dailyContainer) {
            dailyContainer.innerHTML = '';
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            
            daily.time.forEach((t, i) => {
                const d = new Date(t);
                const dayName = i === 0 ? 'Today' : dayNames[d.getUTCDay()]; 
                const { iconPath: dIcon } = getWeatherIcon(daily.weathercode[i], 1); 

                const div = document.createElement('div');
                div.className = 'daily-item';
                div.innerHTML = `
                    <div class="daily-day">${dayName}</div>
                    <div class="daily-icon"><img src="${dIcon}" alt="icon"></div>
                    <div class="daily-temps">
                        <span class="daily-high">${Math.round(daily.temperature_2m_max[i])}°</span>
                        <span class="daily-low">${Math.round(daily.temperature_2m_min[i])}°</span>
                    </div>
                `;
                dailyContainer.appendChild(div);
            });
        }
        
        updateCharts(hourly);
        if (airQuality) updateAirQuality(airQuality.current);
    }

    function updateCharts(hourly) {
        if (!temperatureChart || !precipitationChart) initCharts();

        const is12Hour = (localStorage.getItem('timeFormat') || '12h') === '12h';
        const labels = hourly.time.slice(0, 24).map(t => {
            const h = new Date(t).getHours();
            if (is12Hour) return `${h % 12 || 12} ${h >= 12 ? 'PM' : 'AM'}`;
            return `${h}:00`;
        });
        
        temperatureChart.data.labels = labels;
        temperatureChart.data.datasets[0].data = hourly.temperature_2m.slice(0, 24);
        temperatureChart.data.datasets[1].data = hourly.apparent_temperature.slice(0, 24);
        temperatureChart.update();
        
        precipitationChart.data.labels = labels;
        precipitationChart.data.datasets[0].data = hourly.precipitation.slice(0, 24);
        precipitationChart.data.datasets[1].data = hourly.precipitation_probability.slice(0, 24);
        precipitationChart.update();
    }

    function updateAirQuality(aqData) {
        if (!airQualityContainer) return;

        if (!aqData || aqData.us_aqi === null) {
            airQualityContainer.innerHTML = '<p style="color: var(--text-muted); text-align:center;">Air quality data unavailable.</p>';
            return;
        }

        const aqi = Math.round(aqData.us_aqi);
        let level = 'Good', color = '#00ac89', desc = 'Air quality is satisfactory.';

        if (aqi > 50) { level = 'Moderate'; color = '#f59e0b'; desc = 'Acceptable quality.'; }
        if (aqi > 100) { level = 'Unhealthy for Sensitive'; color = '#f97316'; desc = 'Sensitive groups may suffer.'; }
        if (aqi > 150) { level = 'Unhealthy'; color = '#ef4444'; desc = 'General public may suffer.'; }
        if (aqi > 200) { level = 'Very Unhealthy'; color = '#8b5cf6'; desc = 'Health alert.'; }
        if (aqi > 300) { level = 'Hazardous'; color = '#1f2937'; desc = 'Emergency conditions.'; }

        airQualityContainer.innerHTML = `
            <div class="aqi-header">
                <div class="aqi-value" style="color: ${color}">${aqi}</div>
                <div class="aqi-level">${level}</div>
                <div class="aqi-description">${desc}</div>
            </div>
            <div class="aqi-components">
                ${renderAQComponent('PM2.5', aqData.pm2_5)}
                ${renderAQComponent('PM10', aqData.pm10)}
                ${renderAQComponent('NO₂', aqData.nitrogen_dioxide)}
                ${renderAQComponent('O₃', aqData.ozone)}
            </div>
        `;
    }

    function renderAQComponent(name, value) {
        if (value === null || value === undefined) return '';
        return `
            <div class="aqi-component">
                <span class="aqi-component-name">${name}</span>
                <span class="aqi-component-value">${value.toFixed(1)}</span>
            </div>
        `;
    }

    // --- Google Weather Icons Mapping ---
    function getWeatherIcon(code, isDay) {
        // ==============================================================
        // IMPORTANT FOLDER PATH!
        // Change 'set/' to match the exact name of your folder.
        // E.g., if your folder is inside src, make it './src/set/'
        // ==============================================================
        const ICON_FOLDER_PATH = './src/set/';
        
        let desc = 'Unknown', icon = 'cloudy.svg';

        switch (code) {
            case 0: 
                desc = 'Clear sky'; 
                icon = isDay ? 'sunny.svg' : 'clear.svg'; 
                break;
            case 1: 
                desc = 'Mainly clear'; 
                icon = isDay ? 'mostly_sunny.svg' : 'mostly_clear.svg'; 
                break;
            case 2: 
                desc = 'Partly cloudy'; 
                icon = isDay ? 'partly_cloudy.svg' : 'partly_clear.svg'; 
                break;
            case 3: 
                desc = 'Overcast'; 
                icon = 'cloudy.svg'; 
                break;
            case 45: case 48: 
                desc = 'Fog'; 
                icon = 'fog.svg'; 
                break;
            case 51: case 53: case 55: 
                desc = 'Drizzle'; 
                icon = 'drizzle.svg'; 
                break;
            case 56: case 57: 
                desc = 'Freezing Drizzle'; 
                icon = 'wintry_mix.svg'; 
                break;
            case 61: case 63: 
                desc = 'Rain'; 
                icon = 'showers.svg'; 
                break;
            case 65: 
                desc = 'Heavy Rain'; 
                icon = 'heavy_rain.svg'; 
                break;
            case 66: case 67: 
                desc = 'Freezing Rain'; 
                icon = 'mixed_rain_hail_sleet.svg'; 
                break;
            case 71: case 73: 
                desc = 'Snow fall'; 
                icon = 'flurries.svg'; 
                break;
            case 75: 
                desc = 'Heavy Snow'; 
                icon = 'heavy_snow.svg'; 
                break;
            case 77: 
                desc = 'Snow grains'; 
                icon = 'flurries.svg'; 
                break;
            case 80: case 81: case 82: 
                desc = 'Rain showers'; 
                icon = 'scattered_showers.svg'; 
                break;
            case 85: case 86: 
                desc = 'Snow showers'; 
                icon = 'snow_showers.svg'; 
                break;
            case 95: 
                desc = 'Thunderstorm'; 
                icon = 'isolated_tstorms.svg'; 
                break;
            case 96: case 99: 
                desc = 'Thunderstorm with hail'; 
                icon = 'strong_tstorms.svg'; 
                break;
        }
        return { description: desc, iconPath: ICON_FOLDER_PATH + icon };
    }

    // --- Initialization & Global Listeners ---
    function bootstrapWeather() {
        const saved = JSON.parse(localStorage.getItem('savedLocation') || '{"lat":30.0167,"lon":30.9833,"name":"El Sheikh Zayed City"}');
        fetchAndDisplayWeather(saved.lat, saved.lon, saved.name);
    }

    // Listen for custom location changes dispatched from script.js global modal!
    window.addEventListener('globalLocationChanged', bootstrapWeather);
    
    // Listen for theme changes to redraw charts with correct grid/text colors
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') {
            setTimeout(initCharts, 50); 
            bootstrapWeather();
        }
    });

    initCharts();
    bootstrapWeather();
});