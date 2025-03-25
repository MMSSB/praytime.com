document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const compassNeedle = document.getElementById('compass-needle');
    const qiblaIndicator = document.getElementById('qibla-indicator');
    const compassStatus = document.getElementById('compass-status');

    let latitude, longitude;
    const kaabaLat = 21.4225; // Kaaba latitude
    const kaabaLon = 39.8262; // Kaaba longitude
    const now = new Date();

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

    // Get location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            getCityName(latitude, longitude);
            initCompass();
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById('city-name').textContent = 'Location access denied';
            latitude = 21.4225; // Default to Mecca
            longitude = 39.8262;
            initCompass();
        });
    } else {
        compassStatus.textContent = 'Geolocation not supported by your browser.';
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

    function calculateQiblaAngle(lat1, lon1, lat2, lon2) {
        const dLon = (lon2 - lon1) * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        lon1 = lon1 * Math.PI / 180;

        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        let bearing = Math.atan2(y, x) * 180 / Math.PI;
        bearing = (bearing + 360) % 360; // Normalize to 0-360
        return bearing;
    }

    function initCompass() {
        if ('DeviceOrientationEvent' in window) {
            const qiblaAngle = calculateQiblaAngle(latitude, longitude, kaabaLat, kaabaLon);
            compassStatus.textContent = 'Point your device to align the Qibla indicator.';
            
            window.addEventListener('deviceorientation', (event) => {
                let alpha = event.alpha; // Compass heading (0 = North)
                if (alpha === null) {
                    compassStatus.textContent = 'Compass not supported on this device.';
                    return;
                }

                // Adjust for webkit browsers (Safari)
                if (event.webkitCompassHeading) {
                    alpha = event.webkitCompassHeading;
                }

                // Rotate needle to point North
                compassNeedle.style.transform = `rotate(${alpha}deg)`;

                // Rotate Qibla indicator relative to North
                const adjustedQiblaAngle = (qiblaAngle - alpha + 360) % 360;
                qiblaIndicator.style.transform = `rotate(${adjustedQiblaAngle}deg)`;

                // Check if facing Qibla (within 10 degrees)
                const deviation = Math.abs((alpha - qiblaAngle + 540) % 360 - 180);
                if (deviation < 10) {
                    compassStatus.textContent = 'You are facing the Qibla!';
                    compassStatus.style.color = '#FFD700'; // Gold when aligned
                } else {
                    compassStatus.textContent = 'Point your device to align the Qibla indicator.';
                    compassStatus.style.color = 'var(--muted-foreground)';
                }
            });
        } else {
            compassStatus.textContent = 'Device orientation not supported by your browser.';
        }
    }
});