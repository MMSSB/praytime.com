document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const timesListToday = document.getElementById('times-today');
    const timesListTomorrow = document.getElementById('times-tomorrow');
    const cityNameElement = document.getElementById('city-name');
    const todayButton = document.getElementById('show-today');
    const tomorrowButton = document.getElementById('show-tomorrow');
    const currentTimeElement = document.getElementById('current-time');
    const islamicDateElement = document.getElementById('islamic-date');

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

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    // Update current time
    function updateCurrentTime() {
        const now = new Date();
        currentTimeElement.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();

    // Get Islamic Date
    function getIslamicDate(date) {
        const options = { 
            calendar: 'islamic',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return new Intl.DateTimeFormat('en-US-u-ca-islamic', options).format(date);
    }
    islamicDateElement.textContent = getIslamicDate(new Date());

    // Handle tab switching
    todayButton.addEventListener('click', () => {
        todayButton.classList.add('active');
        tomorrowButton.classList.remove('active');
        timesListToday.style.display = 'block';
        timesListTomorrow.style.display = 'none';
    });

    tomorrowButton.addEventListener('click', () => {
        tomorrowButton.classList.add('active');
        todayButton.classList.remove('active');
        timesListToday.style.display = 'none';
        timesListTomorrow.style.display = 'block';
    });

    // Get prayer times if geolocation is available
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            getCityName(latitude, longitude);
            calculatePrayerTimes(latitude, longitude, new Date(), timesListToday);

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            calculatePrayerTimes(latitude, longitude, tomorrow, timesListTomorrow);
        }, (error) => {
            cityNameElement.textContent = 'Location access denied';
        });
    } else {
        cityNameElement.textContent = 'Geolocation not supported';
    }
});

function calculatePrayerTimes(latitude, longitude, date, timesList) {
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;
    const coordinates = new adhan.Coordinates(latitude, longitude);
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    const prayers = [
        { name: 'Fajr', time: prayerTimes.fajr },
        { name: 'Sunrise', time: prayerTimes.sunrise },
        { name: 'Dhuhr', time: prayerTimes.dhuhr },
        { name: 'Asr', time: prayerTimes.asr },
        { name: 'Maghrib', time: prayerTimes.maghrib },
        { name: 'Isha', time: prayerTimes.isha }
    ];

    timesList.innerHTML = '';
    const now = new Date();

    prayers.forEach((prayer) => {
        const li = document.createElement('li');
        const time = prayer.time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        
        li.innerHTML = `<span>${prayer.name}</span><span>${time}</span>`;

        if (date.getDate() === now.getDate() && prayer.time > now && 
            !timesList.querySelector('.next-prayer')) {
            li.classList.add('next-prayer');
        }

        timesList.appendChild(li);
    });
}

function getCityName(latitude, longitude) {
    const cityNameElement = document.getElementById('city-name');
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || 'Unknown Location';
            cityNameElement.textContent = city;
        })
        .catch(error => {
            cityNameElement.textContent = 'Location unavailable';
            console.error('Error fetching location:', error);
        });
}