document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const monthlyTimesContainer = document.getElementById('monthly-times');

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

    // Get prayer times for the next month
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getCityName(latitude, longitude);
            calculateMonthlyPrayerTimes(latitude, longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
            const meccaLat = 21.4225;
            const meccaLong = 39.8262;
            calculateMonthlyPrayerTimes(meccaLat, meccaLong);
        });
    }

    function calculateMonthlyPrayerTimes(latitude, longitude) {
        const now = new Date();
        const params = adhan.CalculationMethod.MuslimWorldLeague();
        params.madhab = adhan.Madhab.Shafi;
        const coordinates = new adhan.Coordinates(latitude, longitude);

        for (let i = 0; i < 30; i++) {
            const date = new Date(now);
            date.setDate(now.getDate() + i);
            const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

            const prayers = [
                { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
                { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
                { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
                { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
                { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
                { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' }
            ];

            const daySection = document.createElement('div');
            daySection.innerHTML = `
                <h3>${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                <ul class="prayer-grid"></ul>
            `;
            const prayerList = daySection.querySelector('.prayer-grid');

            prayers.forEach(prayer => {
                const li = document.createElement('li');
                const time = prayer.time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
                li.innerHTML = `
                    <div class="prayer-name">
                        <span>${prayer.name}</span>
                        <span class="arabic-name">${prayer.arabicName}</span>
                    </div>
                    <span class="prayer-time">${time}</span>
                `;
                prayerList.appendChild(li);
            });

            monthlyTimesContainer.appendChild(daySection);
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


document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const monthlyTableBody = document.querySelector('#monthly-table tbody');

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

    // Get prayer times for the next month
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            getCityName(latitude, longitude);
            calculateMonthlyPrayerTimes(latitude, longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
            const meccaLat = 21.4225;
            const meccaLong = 39.8262;
            calculateMonthlyPrayerTimes(meccaLat, meccaLong);
        });
    }

    function calculateMonthlyPrayerTimes(latitude, longitude) {
        const now = new Date();
        const params = adhan.CalculationMethod.MuslimWorldLeague();
        params.madhab = adhan.Madhab.Shafi;
        const coordinates = new adhan.Coordinates(latitude, longitude);

        for (let i = 0; i < 30; i++) {
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
            monthlyTableBody.appendChild(row);
        }
    }

    function getCityName(latitude, longitude) {
        const cityNameElement = document.getElementById('city-name');
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
            .then(response => response.json())
            .then(data => {
                const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
                const country = data.address.country || '';
                cityNameElement.textContent = city + (country " + (country ? `, ${country}` : '');
            })
            .catch(() => cityNameElement.textContent = 'Location unavailable');
            
            });
                }
            