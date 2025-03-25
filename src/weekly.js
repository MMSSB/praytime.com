document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const weeklyTableBody = document.querySelector('#weekly-table tbody');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            sidebar.classList.contains('active')) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    // Update date
    function updateDate() {
        const now = new Date();
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    updateDate();

    // Theme handling
    function applyTheme(theme) {
        const body = document.body;
        body.classList.remove('light', 'dark');
        if (theme === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark');
            } else {
                body.classList.add('light');
            }
        } else {
            body.classList.add(theme);
        }
    }
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });

    // Get prayer times for the next week
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getCityName(latitude, longitude);
            calculateWeeklyPrayerTimes(latitude, longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
            const meccaLat = 21.4225;
            const meccaLong = 39.8262;
            calculateWeeklyPrayerTimes(meccaLat, meccaLong);
        });
    }

    function calculateWeeklyPrayerTimes(latitude, longitude) {
        const now = new Date();
        const params = adhan.CalculationMethod.MuslimWorldLeague();
        params.madhab = adhan.Madhab.Shafi;
        const coordinates = new adhan.Coordinates(latitude, longitude);

        for (let i = 0; i < 7; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                <td>${prayerTimes.fajr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>${prayerTimes.sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>${prayerTimes.dhuhr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>${prayerTimes.asr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>${prayerTimes.maghrib.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
                <td>${prayerTimes.isha.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</td>
            `;
            weeklyTableBody.appendChild(row);
        }
    }

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
});