document.addEventListener('DOMContentLoaded', () => {
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

    // Update current time and date
    function updateCurrentTime() {
        const now = new Date();
        
        // Update time
        currentTimeElement.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        // Update date
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', dateOptions);
        dateDetailsElement.textContent = dateStr;
        currentDateElement.textContent = dateStr;
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
            
            // Setup interval to keep checking current prayer status
            setInterval(() => {
                updateCurrentPrayerStatus(latitude, longitude);
            }, 30000); // Every 30 seconds
            
            // Initial check
            updateCurrentPrayerStatus(latitude, longitude);
            
        }, (error) => {
            console.error("Geolocation error:", error);
            cityNameElement.textContent = 'Location access denied';
            // Fallback to a default location (Mecca)
            const meccaLat = 21.4225;
            const meccaLong = 39.8262;
            calculatePrayerTimes(meccaLat, meccaLong, new Date(), timesListToday);
            
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            calculatePrayerTimes(meccaLat, meccaLong, tomorrow, timesListTomorrow);
        });
    } else {
        cityNameElement.textContent = 'Geolocation not supported';
        // Fallback to a default location (Mecca)
        calculatePrayerTimes(21.4225, 39.8262, new Date(), timesListToday);
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        calculatePrayerTimes(21.4225, 39.8262, tomorrow, timesListTomorrow);
    }
    
    // Function to update which prayer is current
function updateCurrentPrayerStatus(latitude, longitude) {
    const now = new Date();
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;
    const coordinates = new adhan.Coordinates(latitude, longitude);
    const prayerTimes = new adhan.PrayerTimes(coordinates, now, params);

    const prayers = [
        { name: 'Fajr', time: prayerTimes.fajr, arabicName: 'الفجر' },
        { name: 'Sunrise', time: prayerTimes.sunrise, arabicName: 'الشروق' },
        { name: 'Dhuhr', time: prayerTimes.dhuhr, arabicName: 'الظهر' },
        { name: 'Asr', time: prayerTimes.asr, arabicName: 'العصر' },
        { name: 'Maghrib', time: prayerTimes.maghrib, arabicName: 'المغرب' },
        { name: 'Isha', time: prayerTimes.isha, arabicName: 'العشاء' }
    ];

    // let currentPrayer = "After Isha"; // Default if no prayer is current

    // Loop through prayers to find the current one
    for (let i = prayers.length - 1; i >= 0; i--) {
        if (now >= prayers[i].time) {
            currentPrayer = prayers[i].name;
            break;
        }
    }

    // Update the DOM to show only the current prayer
    currentPrayerElement.textContent = `Current: ${currentPrayer}`;
}
});

function calculatePrayerTimes(latitude, longitude, date, timesList) {
    const params = adhan.CalculationMethod.MuslimWorldLeague();
    params.madhab = adhan.Madhab.Shafi;
    const coordinates = new adhan.Coordinates(latitude, longitude);
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

    if (date.getDate() === now.getDate() && 
        date.getMonth() === now.getMonth() && 
        date.getFullYear() === now.getFullYear()) {
        for (let i = 0; i < prayers.length; i++) {
            if (prayers[i].time > now) {
                nextPrayerIndex = i;
                previousPrayerTime = i > 0 ? prayers[i - 1].time : null;
                break;
            }
        }
    }

    prayers.forEach((prayer, index) => {
        const li = document.createElement('li');
        const time = prayer.time.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        let prayerHTML = `
            <div class="prayer-name">
                <span>${prayer.name}</span>
                <span class="arabic-name">${prayer.arabicName}</span>
            </div>
            <span class="prayer-time">${time}</span>
        `;

        if (index === nextPrayerIndex && 
            date.getDate() === now.getDate() && 
            date.getMonth() === now.getMonth() && 
            date.getFullYear() === now.getFullYear()) {
            li.classList.add('next-prayer');

            if (previousPrayerTime) {
                const totalDuration = prayer.time - previousPrayerTime;
                const elapsedTime = now - previousPrayerTime;
                const progressPercentage = (elapsedTime / totalDuration) * 100;

                prayerHTML += `
                    <div class="loading-bar">
                        <div class="progress" style="width: ${progressPercentage}%"></div>
                    </div>
                `;
            }
        }

        li.innerHTML = prayerHTML;
        timesList.appendChild(li);
    });

    if (nextPrayerIndex !== -1 && 
        date.getDate() === now.getDate() && 
        date.getMonth() === now.getMonth() && 
        date.getFullYear() === now.getFullYear()) {
        
        // Update progress every minute
        const progressInterval = setInterval(() => {
            const now = new Date();
            const nextPrayerTime = prayers[nextPrayerIndex].time;
            const prevPrayerTime = previousPrayerTime || new Date(now.getFullYear(), now.getMonth(), now.getDate());

            // Check if we've passed the next prayer time
            if (now >= nextPrayerTime) {
                clearInterval(progressInterval);
                // Recalculate the entire day's prayers to update the next prayer indicator
                calculatePrayerTimes(latitude, longitude, date, timesList);
                return;
            }

            const totalDuration = nextPrayerTime - prevPrayerTime;
            const elapsedTime = now - prevPrayerTime;
            const progressPercentage = Math.min((elapsedTime / totalDuration) * 100, 100);

            const progressBar = timesList.querySelector('.next-prayer .progress');
            if (progressBar) {
                progressBar.style.width = `${progressPercentage}%`;
            }
        }, 60000); // Every minute
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
        .catch(error => {
            cityNameElement.textContent = 'Location unavailable';
            console.error('Error fetching location:', error);
        });
}

// Add this at the top of each JS file (after DOMContentLoaded)
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

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});