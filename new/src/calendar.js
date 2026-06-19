document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const hijriYearSelect = document.getElementById('hijri-year-select');
    const hijriMonthSelect = document.getElementById('hijri-month-select');
    const calendarGrid = document.getElementById('calendar-grid');

    const now = new Date();
    const todayHijri = adhan.Date.toHijri(now);

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

    // Populate selectors
    populateHijriYearSelect();
    populateHijriMonthSelect();
    updateCalendar();

    // Event listeners
    hijriYearSelect.addEventListener('change', updateCalendar);
    hijriMonthSelect.addEventListener('change', updateCalendar);

    // Get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            getCityName(position.coords.latitude, position.coords.longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
        });
    }

    function populateHijriYearSelect() {
        const currentHijriYear = todayHijri.year;
        for (let i = currentHijriYear - 5; i <= currentHijriYear + 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            if (i === currentHijriYear) option.selected = true;
            hijriYearSelect.appendChild(option);
        }
    }

    function populateHijriMonthSelect() {
        const hijriMonths = [
            'Muharram', 'Safar', 'Rabiʻ I', 'Rabiʻ II', 'Jumada I', 'Jumada II',
            'Rajab', 'Shaʻban', 'Ramadan', 'Shawwal', 'Dhuʻl-Qiʻdah', 'Dhuʻl-Hijjah'
        ];
        hijriMonths.forEach((month, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = month;
            if (index + 1 === todayHijri.month) option.selected = true;
            hijriMonthSelect.appendChild(option);
        });
    }

    function updateCalendar() {
        calendarGrid.innerHTML = '';
        const year = parseInt(hijriYearSelect.value);
        const month = parseInt(hijriMonthSelect.value);
        const daysInMonth = adhan.Date.hijriDaysInMonth(month, year);
        const firstDayGregorian = adhan.Date.fromHijri({ year, month, day: 1 });
        const startOffset = firstDayGregorian.getDay();

        // Add empty cells for offset
        for (let i = 0; i < startOffset; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }

        // Populate days
        for (let day = 1; day <= daysInMonth; day++) {
            const gregorianDate = adhan.Date.fromHijri({ year, month, day });
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';
            if (year === todayHijri.year && month === todayHijri.month && day === todayHijri.day) {
                dayDiv.classList.add('today');
            }
            dayDiv.innerHTML = `
                <div>${day}</div>
                <div style="font-size: 0.875rem; color: var(--muted-foreground);">${gregorianDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</div>
            `;
            calendarGrid.appendChild(dayDiv);
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