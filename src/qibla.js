document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const currentDateElement = document.getElementById('current-date');
    const qiblaAngleElement = document.getElementById('qibla-angle');
    const canvas = document.getElementById('compass');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target) && 
            sidebar.classList.contains('active')) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    function updateDate() {
        const now = new Date();
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
    }
    updateDate();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const coordinates = new adhan.Coordinates(position.coords.latitude, position.coords.longitude);
            const qibla = adhan.Qibla(coordinates);
            qiblaAngleElement.textContent = `${qibla.toFixed(2)}° from North`;
            getCityName(position.coords.latitude, position.coords.longitude);
            drawCompass(qibla);
        });
    }

    function drawCompass(angle) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 140;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = 'var(--primary)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw North
        ctx.font = '20px Inter';
        ctx.fillStyle = 'var(--foreground)';
        ctx.textAlign = 'center';
        ctx.fillText('N', centerX, centerY - radius + 20);

        // Draw Qibla arrow
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.beginPath();
        ctx.moveTo(0, -radius);
        ctx.lineTo(10, -radius + 20);
        ctx.lineTo(-10, -radius + 20);
        ctx.closePath();
        ctx.fillStyle = 'var(--primary)';
        ctx.fill();
        ctx.restore();
    }
});

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