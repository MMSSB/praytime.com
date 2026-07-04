// document.addEventListener('DOMContentLoaded', () => {
//     // ==========================================
//     // 1. INSTANT TAB SWITCHING (No Delay)
//     // ==========================================
//     const timesToday = document.getElementById('times-today');
//     const timesTomorrow = document.getElementById('times-tomorrow');
//     const btnToday = document.getElementById('show-today');
//     const btnTomorrow = document.getElementById('show-tomorrow');

//     if (btnToday && btnTomorrow && timesToday && timesTomorrow) {
//         btnToday.addEventListener('click', () => {
//             btnToday.classList.add('active'); 
//             btnTomorrow.classList.remove('active');
//             timesToday.style.display = 'grid'; 
//             timesTomorrow.style.display = 'none';
//         });

//         btnTomorrow.addEventListener('click', () => {
//             btnTomorrow.classList.add('active'); 
//             btnToday.classList.remove('active');
//             timesToday.style.display = 'none'; 
//             timesTomorrow.style.display = 'grid';
//         });
//     }

//     // ==========================================
//     // 2. LOCATION API & GPS
//     // ==========================================
//     const searchInput = document.getElementById('city-search-input');
//     const searchResults = document.getElementById('search-results');
//     const useGpsBtn = document.getElementById('use-gps-btn');
//     const cityNameElement = document.getElementById('city-name');
//     let searchTimeout;

//     if (searchInput) {
//         searchInput.addEventListener('input', (e) => {
//             clearTimeout(searchTimeout);
//             const query = e.target.value.trim();
//             if (query.length < 3) { 
//                 searchResults.innerHTML = ''; 
//                 return; 
//             }

//             searchTimeout = setTimeout(() => {
//                 fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
//                     .then(res => res.json())
//                     .then(data => {
//                         searchResults.innerHTML = '';
//                         data.forEach(place => {
//                             const li = document.createElement('li');
//                             li.textContent = place.display_name.split(',').slice(0, 3).join(',');
//                             li.addEventListener('click', () => {
//                                 selectLocation(parseFloat(place.lat), parseFloat(place.lon), place.display_name.split(',')[0]);
//                                 const backdrop = document.getElementById('modal-backdrop');
//                                 if(backdrop) backdrop.click(); 
//                             });
//                             searchResults.appendChild(li);
//                         });
//                     }).catch(console.error);
//             }, 500);
//         });
//     }

//     if (useGpsBtn) {
//         useGpsBtn.addEventListener('click', () => {
//             if (navigator.geolocation) {
//                 useGpsBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Locating...';
//                 navigator.geolocation.getCurrentPosition((pos) => {
//                     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`)
//                         .then(res => res.json())
//                         .then(data => {
//                             selectLocation(pos.coords.latitude, pos.coords.longitude, data.address.city || data.address.suburb || 'My Location', true);
//                             const backdrop = document.getElementById('modal-backdrop');
//                             if(backdrop) backdrop.click(); 
//                             useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
//                         }).catch(() => { 
//                             selectLocation(pos.coords.latitude, pos.coords.longitude, "Current Location", true); 
//                             const backdrop = document.getElementById('modal-backdrop');
//                             if(backdrop) backdrop.click(); 
//                             useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
//                         });
//                 });
//             }
//         });
//     }

//     // ==========================================
//     // 3. STABLE PRAYER ENGINE (Pre-calculating)
//     // ==========================================
//     function selectLocation(lat, lon, name, isGPS = false) {
//         if(cityNameElement) cityNameElement.textContent = name;
//         localStorage.setItem('savedLocation', JSON.stringify({ lat, lon, name, type: isGPS ? 'gps' : 'manual' }));

//         if(timesToday && timesTomorrow) {
//             const now = new Date();
//             const tomorrowDate = new Date(); 
//             tomorrowDate.setDate(tomorrowDate.getDate() + 1);

//             // Calculate both tabs immediately
//             calculatePrayerTimes(lat, lon, now, timesToday, false);
//             calculatePrayerTimes(lat, lon, tomorrowDate, timesTomorrow, true);
//         }
//     }

//     function calculatePrayerTimes(latitude, longitude, targetDate, listContainer, isTomorrowTab) {
//         if(typeof adhan === 'undefined') return; 

//         let params = adhan.CalculationMethod.Egyptian();
//         params.madhab = adhan.Madhab.Shafi; 
//         const coords = new adhan.Coordinates(latitude, longitude);
        
//         const targetTimings = new adhan.PrayerTimes(coords, targetDate, params);
//         const now = new Date();
//         const todayTimings = new adhan.PrayerTimes(coords, now, params);
//         const ishaToday = todayTimings.isha;

//         const prayers = [
//             { name: 'Fajr', time: targetTimings.fajr, arabicName: 'الفجر' },
//             { name: 'Sunrise', time: targetTimings.sunrise, arabicName: 'الشروق' },
//             { name: 'Dhuhr', time: targetTimings.dhuhr, arabicName: 'الظهر' },
//             { name: 'Asr', time: targetTimings.asr, arabicName: 'العصر' },
//             { name: 'Maghrib', time: targetTimings.maghrib, arabicName: 'المغرب' },
//             { name: 'Isha', time: targetTimings.isha, arabicName: 'العشاء' }
//         ];

//         listContainer.innerHTML = '';
//         let activeIdx = -1; 
//         let startTime = null;

//         if (!isTomorrowTab) {
//             for (let i = 0; i < prayers.length; i++) {
//                 if (prayers[i].time > now) {
//                     activeIdx = i;
//                     startTime = i > 0 ? prayers[i - 1].time : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); 
//                     break;
//                 }
//             }
//         } else {
//             if (now > ishaToday) {
//                 activeIdx = 0; 
//                 startTime = ishaToday; 
//             }
//         }

//         prayers.forEach((prayer, index) => {
//             const li = document.createElement('li');
//             li.className = 'prayer-card';
            
//             if (prayer.time < now && !isTomorrowTab) li.classList.add('passed');

//             let htmlStr = `
//                 <div class="p-info">
//                     <span class="p-name">${prayer.name}</span>
//                     <span class="p-arabic">${prayer.arabicName}</span>
//                 </div>
//                 <div class="p-time">${prayer.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>`;

//             if (index === activeIdx) {
//                 li.classList.add('active-prayer');
//                 li.classList.remove('passed'); 
                
//                 if (startTime) {
//                     li.setAttribute('data-start', startTime.getTime());
//                     li.setAttribute('data-end', prayer.time.getTime());
//                     htmlStr += `<div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>`;
//                 }
//             }
            
//             li.innerHTML = htmlStr; 
//             listContainer.appendChild(li);
//         });
//     }

//     // ==========================================
//     // 4. SMOOTH PROGRESS BAR (NO REFRESH)
//     // ==========================================
//     function updateLiveProgress() {
//         const activeCards = document.querySelectorAll('.active-prayer');
//         const now = Date.now();

//         activeCards.forEach(activeCard => {
//             const start = parseInt(activeCard.getAttribute('data-start'));
//             const end = parseInt(activeCard.getAttribute('data-end'));
            
//             if (isNaN(start) || isNaN(end)) return;

//             // Calculate percentage smoothly
//             const percentage = Math.max(0, Math.min(((now - start) / (end - start)) * 100, 100));

//             // ONLY update the width of the progress bar. 
//             // DO NOT rebuild the DOM or refresh the data.
//             const fill = activeCard.querySelector('.progress-fill');
//             if (fill) {
//                 fill.style.width = `${percentage}%`;
//             }
//         });
//     }

//     // ==========================================
//     // 5. INIT APP
//     // ==========================================
//     const saved = localStorage.getItem('savedLocation');
//     if (saved) {
//         const data = JSON.parse(saved); 
//         selectLocation(data.lat, data.lon, data.name, data.type === 'gps');
//     } else {
//         selectLocation(30.0167, 30.9833, 'El Sheikh Zayed City'); 
//     }

//     // Animate progress bar smoothly every second WITHOUT refreshing the page data
//     setInterval(updateLiveProgress, 1000);
// });














document.addEventListener('DOMContentLoaded', () => {
    const timesToday = document.getElementById('times-today');
    const timesTomorrow = document.getElementById('times-tomorrow');
    const btnToday = document.getElementById('show-today');
    const btnTomorrow = document.getElementById('show-tomorrow');
    const cityNameElement = document.getElementById('city-name');

    // Tab view layout controllers
    if (btnToday && btnTomorrow && timesToday && timesTomorrow) {
        btnToday.addEventListener('click', () => {
            btnToday.classList.add('active'); btnTomorrow.classList.remove('active');
            timesToday.style.display = 'grid'; timesTomorrow.style.display = 'none';
        });
        btnTomorrow.addEventListener('click', () => {
            btnTomorrow.classList.add('active'); btnToday.classList.remove('active');
            timesToday.style.display = 'none'; timesTomorrow.style.display = 'grid';
        });
    }

    function buildDashboardView() {
        const saved = JSON.parse(localStorage.getItem('savedLocation') || '{"lat":30.0167,"lon":30.9833,"name":"El Sheikh Zayed City"}');
        
        if (cityNameElement) cityNameElement.textContent = saved.name;
        if (!timesToday || !timesTomorrow) return;

        const currentDay = new Date();
        const tomorrowDay = new Date(); 
        tomorrowDay.setDate(tomorrowDay.getDate() + 1);

        populatePrayerGrid(saved.lat, saved.lon, currentDay, timesToday);
        populatePrayerGrid(saved.lat, saved.lon, tomorrowDay, timesTomorrow);
        updateLiveProgress();
    }

    function populatePrayerGrid(latitude, longitude, dateContext, targetList) {
        const prayers = window.getGlobalPrayerTimes(latitude, longitude, dateContext);
        if (prayers.length === 0) return;

        const is12Hour = (localStorage.getItem('timeFormat') || '12h') === '12h';
        targetList.innerHTML = '';

        prayers.forEach((prayer) => {
            const li = document.createElement('li');
            li.className = 'prayer-card';
            li.setAttribute('data-time', prayer.time.getTime()); 
            
            li.innerHTML = `
                <div class="p-info">
                    <span class="p-name">${prayer.name}</span>
                    <span class="p-arabic">${prayer.arabicName}</span>
                </div>
                <div class="p-time">${prayer.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: is12Hour })}</div>`;
            
            targetList.appendChild(li);
        });
    }

    // Dynamic state highlighter loops
    function updateLiveProgress() {
        const now = Date.now();
        const todayCards = document.querySelectorAll('#times-today .prayer-card');
        const tomorrowCards = document.querySelectorAll('#times-tomorrow .prayer-card');
        if (todayCards.length === 0) return;

        // Automatically reload view if tab left active over midnight boundary
        const firstCardTime = new Date(parseInt(todayCards[0].getAttribute('data-time')));
        if (new Date().getDate() !== firstCardTime.getDate()) {
            return location.reload();
        }

        let activeFoundToday = false;
        let previousTargetTime = new Date(firstCardTime).setHours(0, 0, 0, 0); 
        
        todayCards.forEach(card => {
            const cardPrayerTimestamp = parseInt(card.getAttribute('data-time'));
            
            if (cardPrayerTimestamp <= now) {
                card.classList.add('passed'); 
                card.classList.remove('active-prayer');
                removeProgressBarContainer(card);
                previousTargetTime = cardPrayerTimestamp; 
            } else if (!activeFoundToday) {
                activeFoundToday = true;
                card.classList.remove('passed'); 
                card.classList.add('active-prayer');
                renderProgressBarContainer(card, previousTargetTime, cardPrayerTimestamp, now);
            } else {
                card.classList.remove('passed', 'active-prayer');
                removeProgressBarContainer(card);
            }
        });

        // Compute transitions tracking to tomorrow's Fajr window if past Isha
        const todayIshaTimestamp = parseInt(todayCards[todayCards.length - 1].getAttribute('data-time'));
        tomorrowCards.forEach((card, index) => {
            card.classList.remove('passed');
            if (index === 0 && now >= todayIshaTimestamp) {
                card.classList.add('active-prayer');
                renderProgressBarContainer(card, todayIshaTimestamp, parseInt(card.getAttribute('data-time')), now);
            } else {
                card.classList.remove('active-prayer');
                removeProgressBarContainer(card);
            }
        });
    }

    function renderProgressBarContainer(card, start, end, now) {
        let bar = card.querySelector('.progress-bar');
        if (!bar) {
            bar = document.createElement('div'); 
            bar.className = 'progress-bar';
            bar.innerHTML = '<div class="progress-fill" style="width: 0%"></div>';
            card.appendChild(bar);
        }
        const fill = bar.querySelector('.progress-fill');
        const percentage = Math.max(0, Math.min(((now - start) / (end - start)) * 100, 100));
        fill.style.width = `${percentage}%`;
    }

    function removeProgressBarContainer(card) {
        const bar = card.querySelector('.progress-bar');
        if (bar) bar.remove();
    }

    // Event hooks configuration
    window.addEventListener('globalLocationChanged', buildDashboardView);
    buildDashboardView();
    setInterval(updateLiveProgress, 1000);
});













// document.addEventListener('DOMContentLoaded', () => {
//     // ==========================================
//     // 1. INSTANT TAB SWITCHING
//     // ==========================================
//     const timesToday = document.getElementById('times-today');
//     const timesTomorrow = document.getElementById('times-tomorrow');
//     const btnToday = document.getElementById('show-today');
//     const btnTomorrow = document.getElementById('show-tomorrow');

//     if (btnToday && btnTomorrow && timesToday && timesTomorrow) {
//         btnToday.addEventListener('click', () => {
//             btnToday.classList.add('active'); 
//             btnTomorrow.classList.remove('active');
//             timesToday.style.display = 'grid'; 
//             timesTomorrow.style.display = 'none';
//         });

//         btnTomorrow.addEventListener('click', () => {
//             btnTomorrow.classList.add('active'); 
//             btnToday.classList.remove('active');
//             timesToday.style.display = 'none'; 
//             timesTomorrow.style.display = 'grid';
//         });
//     }

//     // ==========================================
//     // 2. LOCATION API & GPS
//     // ==========================================
//     const searchInput = document.getElementById('city-search-input');
//     const searchResults = document.getElementById('search-results');
//     const useGpsBtn = document.getElementById('use-gps-btn');
//     const cityNameElement = document.getElementById('city-name');
//     let searchTimeout;

//     if (searchInput) {
//         searchInput.addEventListener('input', (e) => {
//             clearTimeout(searchTimeout);
//             const query = e.target.value.trim();
//             if (query.length < 3) { 
//                 searchResults.innerHTML = ''; 
//                 return; 
//             }

//             searchTimeout = setTimeout(() => {
//                 fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
//                     .then(res => res.json())
//                     .then(data => {
//                         searchResults.innerHTML = '';
//                         data.forEach(place => {
//                             const li = document.createElement('li');
//                             li.textContent = place.display_name.split(',').slice(0, 3).join(',');
//                             li.addEventListener('click', () => {
//                                 selectLocation(parseFloat(place.lat), parseFloat(place.lon), place.display_name.split(',')[0]);
//                                 const backdrop = document.getElementById('modal-backdrop');
//                                 if(backdrop) backdrop.click(); 
//                             });
//                             searchResults.appendChild(li);
//                         });
//                     }).catch(console.error);
//             }, 500);
//         });
//     }

//     if (useGpsBtn) {
//         useGpsBtn.addEventListener('click', () => {
//             if (navigator.geolocation) {
//                 useGpsBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Locating...';
//                 navigator.geolocation.getCurrentPosition((pos) => {
//                     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`)
//                         .then(res => res.json())
//                         .then(data => {
//                             selectLocation(pos.coords.latitude, pos.coords.longitude, data.address.city || data.address.suburb || 'My Location', true);
//                             const backdrop = document.getElementById('modal-backdrop');
//                             if(backdrop) backdrop.click(); 
//                             useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
//                         }).catch(() => { 
//                             selectLocation(pos.coords.latitude, pos.coords.longitude, "Current Location", true); 
//                             const backdrop = document.getElementById('modal-backdrop');
//                             if(backdrop) backdrop.click(); 
//                             useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
//                         });
//                 });
//             }
//         });
//     }

//     // ==========================================
//     // 3. PRAYER ENGINE (DOM Rendering Only)
//     // ==========================================
//     function selectLocation(lat, lon, name, isGPS = false) {
//         if(cityNameElement) cityNameElement.textContent = name;
//         localStorage.setItem('savedLocation', JSON.stringify({ lat, lon, name, type: isGPS ? 'gps' : 'manual' }));

//         if(timesToday && timesTomorrow) {
//             const now = new Date();
//             const tomorrowDate = new Date(); 
//             tomorrowDate.setDate(tomorrowDate.getDate() + 1);

//             // Generate HTML structure
//             calculatePrayerTimes(lat, lon, now, timesToday, false);
//             calculatePrayerTimes(lat, lon, tomorrowDate, timesTomorrow, true);
            
//             // Instantly evaluate live states
//             updateLiveProgress();
//         }
//     }

//     function calculatePrayerTimes(latitude, longitude, targetDate, listContainer, isTomorrowTab) {
//         if(typeof adhan === 'undefined') return; 

//         let params = adhan.CalculationMethod.Egyptian();
//         params.madhab = adhan.Madhab.Shafi; 
//         const coords = new adhan.Coordinates(latitude, longitude);
//         const targetTimings = new adhan.PrayerTimes(coords, targetDate, params);

//         const prayers = [
//             { name: 'Fajr', time: targetTimings.fajr, arabicName: 'الفجر' },
//             { name: 'Sunrise', time: targetTimings.sunrise, arabicName: 'الشروق' },
//             { name: 'Dhuhr', time: targetTimings.dhuhr, arabicName: 'الظهر' },
//             { name: 'Asr', time: targetTimings.asr, arabicName: 'العصر' },
//             { name: 'Maghrib', time: targetTimings.maghrib, arabicName: 'المغرب' },
//             { name: 'Isha', time: targetTimings.isha, arabicName: 'العشاء' }
//         ];

//         listContainer.innerHTML = '';

//         prayers.forEach((prayer) => {
//             const li = document.createElement('li');
//             li.className = 'prayer-card';
            
//             // We save the exact timestamp in the DOM so the interval can read it securely
//             li.setAttribute('data-time', prayer.time.getTime()); 
            
//             li.innerHTML = `
//                 <div class="p-info">
//                     <span class="p-name">${prayer.name}</span>
//                     <span class="p-arabic">${prayer.arabicName}</span>
//                 </div>
//                 <div class="p-time">${prayer.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>`;
            
//             listContainer.appendChild(li);
//         });
//     }

//     // ==========================================
//     // 4. DYNAMIC STATE & PROGRESS (No Refresh Glitch)
//     // ==========================================
//     function updateLiveProgress() {
//         const now = Date.now();
//         const todayCards = document.querySelectorAll('#times-today .prayer-card');
//         const tomorrowCards = document.querySelectorAll('#times-tomorrow .prayer-card');

//         if (todayCards.length === 0) return;

//         // 1. Midnight rollover check (if tab left open overnight)
//         const firstPrayerTime = new Date(parseInt(todayCards[0].getAttribute('data-time')));
//         if (new Date().getDate() !== firstPrayerTime.getDate()) {
//             const saved = JSON.parse(localStorage.getItem('savedLocation'));
//             if (saved) selectLocation(saved.lat, saved.lon, saved.name, saved.type === 'gps');
//             return;
//         }

//         // 2. Handle Today's Prayers dynamically
//         let activeFoundToday = false;
//         let lastTime = new Date(firstPrayerTime).setHours(0, 0, 0, 0); // Start at midnight
        
//         todayCards.forEach(card => {
//             const prayerTime = parseInt(card.getAttribute('data-time'));
            
//             if (prayerTime <= now) {
//                 // Prayer has already passed
//                 card.classList.add('passed');
//                 card.classList.remove('active-prayer');
//                 removeProgressBar(card);
//                 lastTime = prayerTime; // Save this time as the start for the next prayer
//             } else if (!activeFoundToday) {
//                 // This is the FIRST prayer in the future -> It is the ACTIVE upcoming one!
//                 activeFoundToday = true;
//                 card.classList.remove('passed');
//                 card.classList.add('active-prayer');
//                 updateProgressBar(card, lastTime, prayerTime, now);
//             } else {
//                 // Future prayers
//                 card.classList.remove('passed', 'active-prayer');
//                 removeProgressBar(card);
//             }
//         });

//         // 3. Handle Tomorrow's Prayers (Only active if past Today's Isha)
//         const ishaTimeToday = parseInt(todayCards[todayCards.length - 1].getAttribute('data-time'));
        
//         tomorrowCards.forEach((card, index) => {
//             const prayerTime = parseInt(card.getAttribute('data-time'));
//             card.classList.remove('passed');
            
//             if (index === 0 && now >= ishaTimeToday) {
//                 card.classList.add('active-prayer');
//                 updateProgressBar(card, ishaTimeToday, prayerTime, now);
//             } else {
//                 card.classList.remove('active-prayer');
//                 removeProgressBar(card);
//             }
//         });
//     }

//     // Helpers to inject/update the bar smoothly without destroying HTML
//     function updateProgressBar(card, start, end, now) {
//         let bar = card.querySelector('.progress-bar');
//         if (!bar) {
//             bar = document.createElement('div');
//             bar.className = 'progress-bar';
//             bar.innerHTML = '<div class="progress-fill" style="width: 0%"></div>';
//             card.appendChild(bar);
//         }
//         const fill = bar.querySelector('.progress-fill');
//         const percentage = Math.max(0, Math.min(((now - start) / (end - start)) * 100, 100));
//         fill.style.width = `${percentage}%`;
//     }

//     function removeProgressBar(card) {
//         const bar = card.querySelector('.progress-bar');
//         if (bar) bar.remove();
//     }

//     // ==========================================
//     // 5. INIT APP
//     // ==========================================
//     const saved = localStorage.getItem('savedLocation');
//     if (saved) {
//         const data = JSON.parse(saved); 
//         selectLocation(data.lat, data.lon, data.name, data.type === 'gps');
//     } else {
//         selectLocation(30.0167, 30.9833, 'El Sheikh Zayed City'); 
//     }

//     // Animate smoothly every second
//     setInterval(updateLiveProgress, 1000);
// });