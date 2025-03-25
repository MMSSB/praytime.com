document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const weekSelect = document.getElementById('week-select');
    const prayerTableBody = document.querySelector('#prayer-table tbody');

    let latitude, longitude;
    const now = new Date();
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;

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

    // Initialize selectors
    populateYearSelect();
    populateMonthSelect();
    populateWeekSelect(now.getFullYear(), now.getMonth());
    updatePrayerTimes();

    // Event listeners
    yearSelect.addEventListener('change', () => {
        populateWeekSelect(parseInt(yearSelect.value), parseInt(monthSelect.value));
        updatePrayerTimes();
    });
    monthSelect.addEventListener('change', () => {
        populateWeekSelect(parseInt(yearSelect.value), parseInt(monthSelect.value));
        updatePrayerTimes();
    });
    weekSelect.addEventListener('change', updatePrayerTimes);

    // Get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getCityName(latitude, longitude);
            updatePrayerTimes();
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
            latitude = 21.4225; // Mecca
            longitude = 39.8262;
            updatePrayerTimes();
        });
    }

    function populateYearSelect() {
        const currentYear = now.getFullYear();
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }
    }

    function populateMonthSelect() {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        months.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = month;
            if (index === now.getMonth()) option.selected = true;
            monthSelect.appendChild(option);
        });
    }

    function populateWeekSelect(year, month) {
        weekSelect.innerHTML = '';
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        let weekStart = new Date(firstDay);
        let weekNum = 1;

        while (weekStart <= lastDay) {
            const option = document.createElement('option');
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            if (weekEnd > lastDay) weekEnd.setDate(lastDay.getDate());
            option.value = `${weekStart.toISOString().split('T')[0]}`;
            option.textContent = `Week ${weekNum} (${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})`;
            weekSelect.appendChild(option);
            weekStart.setDate(weekStart.getDate() + 7);
            weekNum++;
        }
    }

    function updatePrayerTimes() {
        prayerTableBody.innerHTML = '';
        const coordinates = new adhan.Coordinates(latitude, longitude);
        const weekStart = new Date(weekSelect.value);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        for (let date = new Date(weekStart); date <= weekEnd; date.setDate(date.getDate() + 1)) {
            const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                <td><input type="time" value="${formatTime(prayerTimes.fajr)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="fajr"></td>
                <td><input type="time" value="${formatTime(prayerTimes.sunrise)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="sunrise"></td>
                <td><input type="time" value="${formatTime(prayerTimes.dhuhr)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="dhuhr"></td>
                <td><input type="time" value="${formatTime(prayerTimes.asr)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="asr"></td>
                <td><input type="time" value="${formatTime(prayerTimes.maghrib)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="maghrib"></td>
                <td><input type="time" value="${formatTime(prayerTimes.isha)}" data-date="${date.toISOString().split('T')[0]}" data-prayer="isha"></td>
            `;
            prayerTableBody.appendChild(row);
        }

        // Add event listeners for editing
        prayerTableBody.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                const date = e.target.dataset.date;
                const prayer = e.target.dataset.prayer;
                const newTime = e.target.value;
                console.log(`Updated ${prayer} on ${date} to ${newTime}`);
                // Here you can add logic to save the edited time, e.g., to localStorage or a server
            });
        });
    }

    function formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
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