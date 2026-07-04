// document.addEventListener('DOMContentLoaded', () => {
//     // ==========================================
//     // 1. THEME MANAGEMENT (Universal Sync)
//     // ==========================================
//     function applyTheme(theme) {
//         const body = document.body;
//         body.classList.remove('light', 'dark');
        
//         if (theme === 'system') {
//             if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//                 body.classList.add('dark');
//             } else {
//                 body.classList.add('light');
//             }
//         } else {
//             body.classList.add(theme);
//         }
//     }
    
//     const savedTheme = localStorage.getItem('theme') || 'system';
//     applyTheme(savedTheme);
    
//     // Listen for OS system theme changes
//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
//         if (localStorage.getItem('theme') === 'system') applyTheme('system');
//     });

//     // Listen for theme changes from other tabs (Settings page)
//     window.addEventListener('storage', (e) => {
//         if (e.key === 'theme') applyTheme(e.newValue || 'system');
//     });

//     const themeSelect = document.getElementById('theme-select');
//     if (themeSelect) {
//         themeSelect.value = savedTheme;
//         themeSelect.addEventListener('change', (e) => {
//             localStorage.setItem('theme', e.target.value);
//             applyTheme(e.target.value);
//         });
//     }

//     // ==========================================
//     // 2. LIVE CLOCK & DATE LOGIC
//     // ==========================================
//     const timeEl = document.getElementById('current-time');
//     const dateEl = document.getElementById('date-details');
//     const currentEl = document.getElementById('current-date');
//     const islamicEl = document.getElementById('islamic-date');

//     function updateTimeAndDate() {
//         const now = new Date();
        
//         if (timeEl) {
//             timeEl.textContent = now.toLocaleTimeString('en-US', { 
//                 hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
//             });
//         }
        
//         const dateStr = now.toLocaleDateString('en-US', { 
//             weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
//         });
        
//         if (dateEl) dateEl.textContent = dateStr;
//         if (currentEl) currentEl.textContent = dateStr;
        
//         if (islamicEl) {
//             try { 
//                 islamicEl.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', { 
//                     day: 'numeric', month: 'long', year: 'numeric' 
//                 }).format(now); 
//             } catch(e) {}
//         }
//     }
    
//     if (timeEl || dateEl || currentEl) { 
//         setInterval(updateTimeAndDate, 1000); 
//         updateTimeAndDate(); 
//     }

//     // ==========================================
//     // 3. AUTO-ACTIVE NAVIGATION LINKS
//     // ==========================================
//     const navLinks = document.querySelectorAll('.nav-link');
//     const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
//     navLinks.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href') === currentPath) link.classList.add('active');
//     });

//     // ==========================================
//     // 4. SHARED MODAL & SHEET LOGIC (Drag & Click)
//     // ==========================================
//     const modalBackdrop = document.getElementById('modal-backdrop');
    
//     // Modals
//     const locationModal = document.getElementById('location-modal');
//     const mobileNavSheet = document.getElementById('mobile-nav-sheet');
    
//     // Buttons
//     const locationDisplay = document.getElementById('location-display');
//     const closeLocBtn = document.getElementById('close-search-btn');
//     const mobileMenuBtn = document.getElementById('mobile-menu-btn');
//     const closeMenuBtn = document.getElementById('close-menu-btn');

//     let activeModal = null; 

//     function openModal(modalElement) {
//         activeModal = modalElement;
//         modalElement.classList.add('active');
//         if (modalBackdrop) modalBackdrop.classList.add('active');
//         document.body.style.overflow = 'hidden'; // Prevent background scroll
//     }

//     function closeModals() {
//         if (activeModal) {
//             activeModal.classList.remove('active');
//             activeModal.style.transform = ''; // Reset drag translation
//         }
//         if (modalBackdrop) modalBackdrop.classList.remove('active');
//         document.body.style.overflow = '';
//         activeModal = null;
//     }

//     // Bind Button Clicks
//     if (locationDisplay) locationDisplay.addEventListener('click', () => openModal(locationModal));
//     if (closeLocBtn) closeLocBtn.addEventListener('click', closeModals);
    
//     if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => openModal(mobileNavSheet));
//     if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeModals);
    
//     if (modalBackdrop) modalBackdrop.addEventListener('click', closeModals);

//     // Bind Mobile Drag-to-Close Logic
//     [locationModal, mobileNavSheet].forEach(modal => {
//         if (!modal) return;
//         let startY = 0, currentY = 0, isDragging = false;

//         modal.addEventListener('touchstart', (e) => {
//             if (window.innerWidth > 900) return; // Only apply on mobile screens
//             startY = e.touches[0].clientY;
//             isDragging = true;
//             modal.style.transition = 'none'; // Snap to finger
//         });

//         modal.addEventListener('touchmove', (e) => {
//             if (!isDragging || window.innerWidth > 900) return;
//             currentY = e.touches[0].clientY;
//             const deltaY = currentY - startY;
//             // Only allow dragging downwards
//             if (deltaY > 0) modal.style.transform = `translateY(${deltaY}px)`;
//         });

//         modal.addEventListener('touchend', (e) => {
//             if (!isDragging || window.innerWidth > 900) return;
//             isDragging = false;
//             modal.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)'; // Restore iOS spring physics
            
//             // If dragged down enough, close it. Otherwise, snap back to top.
//             if (currentY - startY > 100) {
//                 closeModals();
//             } else {
//                 modal.style.transform = 'translateY(0)';
//             }
//         });
//     });
// });


















































// document.addEventListener('DOMContentLoaded', () => {
//     // ==========================================
//     // 1. THEME MANAGEMENT (Universal Sync)
//     // ==========================================
//     function applyTheme(theme) {
//         const body = document.body;
//         body.classList.remove('light', 'dark');
//         if (theme === 'system') {
//             if (window.matchMedia('(prefers-color-scheme: dark)').matches) body.classList.add('dark');
//             else body.classList.add('light');
//         } else {
//             body.classList.add(theme);
//         }
//     }

//     const savedTheme = localStorage.getItem('theme') || 'system';
//     applyTheme(savedTheme);

//     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
//         if (localStorage.getItem('theme') === 'system') applyTheme('system');
//     });

//     // Sync theme across multiple open tabs
//     window.addEventListener('storage', (e) => {
//         if (e.key === 'theme') applyTheme(e.newValue || 'system');
//     });

//     // ==========================================
//     // 2. LIVE CLOCK & DATE LOGIC
//     // ==========================================
//     const timeEl = document.getElementById('current-time');
//     const dateEl = document.getElementById('date-details');
//     const currentEl = document.getElementById('current-date');
//     const islamicEl = document.getElementById('islamic-date');

//     function updateTimeAndDate() {
//         const now = new Date();
//         if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        
//         const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
//         if (dateEl) dateEl.textContent = dateStr;
//         if (currentEl) currentEl.textContent = dateStr;
        
//         if (islamicEl) {
//             try { islamicEl.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(now); } catch(e) {}
//         }
//     }

//     if (timeEl || dateEl || currentEl) { 
//         setInterval(updateTimeAndDate, 1000); 
//         updateTimeAndDate(); 
//     }

//     // ==========================================
//     // 3. AUTO-ACTIVE NAVIGATION LINKS (FIXED)
//     // ==========================================
//     const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
//     // FIX: Target all navigation links in sidebar, bottom nav, and mobile sheet
//     const allNavLinks = document.querySelectorAll('.side-nav a, .bottom-nav a, .sheet-links a');
//     allNavLinks.forEach(link => {
//         link.classList.remove('active');
//         const href = link.getAttribute('href');
//         // Handle both relative and absolute paths
//         if (href === currentPath || href === './' + currentPath || href === '/' + currentPath) {
//             link.classList.add('active');
//         }
//     });

//     // ==========================================
//     // 4. SHARED MODAL & SHEET LOGIC
//     // ==========================================
//     const modalBackdrop = document.getElementById('modal-backdrop');
//     const locationModal = document.getElementById('location-modal');
//     const mobileNavSheet = document.getElementById('mobile-nav-sheet');

//     const locationDisplay = document.getElementById('location-display');
//     const closeLocBtn = document.getElementById('close-search-btn');
//     const mobileMenuBtn = document.getElementById('mobile-menu-btn');
//     const closeMenuBtn = document.getElementById('close-menu-btn');
     
//     let activeModal = null; 

//     function openModal(modalElement) {
//         activeModal = modalElement;
//         modalElement.classList.add('active');
//         if (modalBackdrop) modalBackdrop.classList.add('active');
//         document.body.style.overflow = 'hidden';
//     }

//     function closeModals() {
//         if (activeModal) {
//             activeModal.classList.remove('active');
//             activeModal.style.transform = '';
//         }
//         if (modalBackdrop) modalBackdrop.classList.remove('active');
//         document.body.style.overflow = '';
//         activeModal = null;
//     }

//     if (locationDisplay) locationDisplay.addEventListener('click', () => openModal(locationModal));
//     if (closeLocBtn) closeLocBtn.addEventListener('click', closeModals);
//     if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => openModal(mobileNavSheet));
//     if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeModals);
//     if (modalBackdrop) modalBackdrop.addEventListener('click', closeModals);

//     // Mobile Drag-to-Close Logic
//     [locationModal, mobileNavSheet].forEach(modal => {
//         if (!modal) return;
//         let startY = 0, currentY = 0, isDragging = false;

//         modal.addEventListener('touchstart', (e) => {
//             if (window.innerWidth > 900) return;
//             startY = e.touches[0].clientY;
//             isDragging = true;
//             modal.style.transition = 'none';
//         });
     
//         modal.addEventListener('touchmove', (e) => {
//             if (!isDragging || window.innerWidth > 900) return;
//             currentY = e.touches[0].clientY;
//             const deltaY = currentY - startY;
//             if (deltaY > 0) modal.style.transform = `translateY(${deltaY}px)`;
//         });

//         modal.addEventListener('touchend', () => {
//             if (!isDragging || window.innerWidth > 900) return;
//             isDragging = false;
//             modal.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
//             if (currentY - startY > 100) closeModals();
//             else modal.style.transform = 'translateY(0)';
//         });
//     });
// });
























document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. UNIVERSAL THEME CONFIGURATION
    // ==========================================
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

    // Run application immediately on mount
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Watch for OS theme adaptations
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });

    // Handle cross-tab multi-view syncing
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') applyTheme(e.newValue || 'system');
    });

    // Instantly process drop-down changes if present on current view
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
        themeSelect.addEventListener('change', (e) => {
            const selected = e.target.value;
            localStorage.setItem('theme', selected);
            applyTheme(selected);
        });
    }

    // ==========================================
    // 2. LIVE DATE & CLOCK CHRONOMETER
    // ==========================================
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('date-details');
    const currentEl = document.getElementById('current-date');
    const islamicEl = document.getElementById('islamic-date');

    function updateTimeAndDate() {
        const now = new Date();
        const formatSetting = localStorage.getItem('timeFormat') || '12h';
        const is12Hour = (formatSetting === '12h');
        
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: is12Hour 
            });
        }
        
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
        });
        
        if (dateEl) dateEl.textContent = dateStr;
        if (currentEl) currentEl.textContent = dateStr;
        
        if (islamicEl) {
            try { 
                islamicEl.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                }).format(now); 
            } catch(e) {}
        }
    }
    
    if (timeEl || dateEl || currentEl || islamicEl) { 
        setInterval(updateTimeAndDate, 1000); 
        updateTimeAndDate(); 
    }

    // Auto-highlight active navigation hyperlinks
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.side-nav a, .bottom-nav a, .sheet-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPath || href === './' + currentPath || href === '/' + currentPath) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 3. CENTRALIZED MODALS & OVERLAYS
    // ==========================================
    const modalBackdrop = document.getElementById('modal-backdrop');
    const locationModal = document.getElementById('location-modal');
    const mobileNavSheet = document.getElementById('mobile-nav-sheet');
    let activeModal = null; 

    function openModal(modalElement) {
        if (!modalElement) return;
        activeModal = modalElement;
        modalElement.classList.add('active');
        if (modalBackdrop) modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModals() {
        if (activeModal) {
            activeModal.classList.remove('active');
            activeModal.style.transform = ''; 
        }
        if (modalBackdrop) modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        activeModal = null;
    }

    // Bind triggers securely across multiple markup files
    document.querySelectorAll('#location-display, .trigger-location').forEach(element => {
        element.addEventListener('click', () => openModal(locationModal));
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => openModal(mobileNavSheet));

    document.querySelectorAll('#close-search-btn, #close-menu-btn').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });
    
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModals);

    // Mobile gesture drag-to-dismiss sheet logic
    [locationModal, mobileNavSheet].forEach(modal => {
        if (!modal) return;
        let startY = 0, currentY = 0, isDragging = false;

        modal.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 900) return; 
            startY = e.touches[0].clientY;
            isDragging = true;
            modal.style.transition = 'none';
        });

        modal.addEventListener('touchmove', (e) => {
            if (!isDragging || window.innerWidth > 900) return;
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            if (deltaY > 0) modal.style.transform = `translateY(${deltaY}px)`;
        });

        modal.addEventListener('touchend', () => {
            if (!isDragging || window.innerWidth > 900) return;
            isDragging = false;
            modal.style.transition = 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
            if (currentY - startY > 100) {
                closeModals();
            } else {
                modal.style.transform = 'translateY(0)';
            }
        });
    });

    // ==========================================
    // 4. UNIFIED GEOLOCATION ENGINE
    // ==========================================
    const searchInput = document.getElementById('city-search-input');
    const searchResults = document.getElementById('search-results');
    const useGpsBtn = document.getElementById('use-gps-btn');
    let searchTimeout;

    function emitLocationChange(lat, lon, name, type) {
        localStorage.setItem('savedLocation', JSON.stringify({ lat, lon, name, type }));
        window.dispatchEvent(new CustomEvent('globalLocationChanged', { detail: { lat, lon, name } }));
        closeModals();
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            if (query.length < 3) { 
                searchResults.innerHTML = ''; 
                return; 
            }

            searchTimeout = setTimeout(() => {
                fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
                    .then(res => res.json())
                    .then(data => {
                        searchResults.innerHTML = '';
                        data.forEach(place => {
                            const li = document.createElement('li');
                            li.textContent = place.display_name.split(',').slice(0, 3).join(',');
                            li.addEventListener('click', () => {
                                const parsedName = place.display_name.split(',')[0];
                                emitLocationChange(parseFloat(place.lat), parseFloat(place.lon), parsedName, 'manual');
                                searchInput.value = '';
                            });
                            searchResults.appendChild(li);
                        });
                    }).catch(console.error);
            }, 500);
        });
    }

    if (useGpsBtn) {
        useGpsBtn.addEventListener('click', () => {
            if (navigator.geolocation) {
                useGpsBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Synchronizing...';
                navigator.geolocation.getCurrentPosition((pos) => {
                    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&zoom=10`)
                        .then(res => res.json())
                        .then(data => {
                            const locationTitle = data.address.city || data.address.suburb || data.address.state || 'My Location';
                            emitLocationChange(pos.coords.latitude, pos.coords.longitude, locationTitle, 'gps');
                            useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
                        }).catch(() => { 
                            emitLocationChange(pos.coords.latitude, pos.coords.longitude, "Current Location", 'gps'); 
                            useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
                        });
                }, () => {
                    alert("Location access denied or unavailable.");
                    useGpsBtn.innerHTML = '<i class="ri-gps-line"></i> Use Current Location';
                });
            }
        });
    }

    // ==========================================
    // 5. GLOBAL ADHAN MATHEMATICS UTILITY
    // ==========================================
    window.getGlobalPrayerTimes = function(latitude, longitude, targetDate) {
        if (typeof adhan === 'undefined') return [];

        const savedMethod = localStorage.getItem('calcMethod') || 'Egyptian';
        let params = adhan.CalculationMethod.Egyptian();
        
        if (savedMethod === 'MuslimWorldLeague') params = adhan.CalculationMethod.MuslimWorldLeague();
        else if (savedMethod === 'ISNA') params = adhan.CalculationMethod.NorthAmerica();
        else if (savedMethod === 'Mecca') params = adhan.CalculationMethod.UmmAlQura();
        else if (savedMethod === 'Karachi') params = adhan.CalculationMethod.Karachi();

        const savedAsr = localStorage.getItem('asrMethod') || 'Shafi';
        params.madhab = (savedAsr === 'Hanafi') ? adhan.Madhab.Hanafi : adhan.Madhab.Shafi;

        const coords = new adhan.Coordinates(latitude, longitude);
        const targetTimings = new adhan.PrayerTimes(coords, targetDate, params);

        return [
            { name: 'Fajr', time: targetTimings.fajr, arabicName: 'الفجر' },
            { name: 'Sunrise', time: targetTimings.sunrise, arabicName: 'الشروق' },
            { name: 'Dhuhr', time: targetTimings.dhuhr, arabicName: 'الظهر' },
            { name: 'Asr', time: targetTimings.asr, arabicName: 'العصر' },
            { name: 'Maghrib', time: targetTimings.maghrib, arabicName: 'المغرب' },
            { name: 'Isha', time: targetTimings.isha, arabicName: 'العشاء' }
        ];
    };
});