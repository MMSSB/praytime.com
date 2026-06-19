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


















































document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. THEME MANAGEMENT (Universal Sync)
    // ==========================================
    function applyTheme(theme) {
        const body = document.body;
        body.classList.remove('light', 'dark');
        if (theme === 'system') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) body.classList.add('dark');
            else body.classList.add('light');
        } else {
            body.classList.add(theme);
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });

    // Sync theme across multiple open tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'theme') applyTheme(e.newValue || 'system');
    });

    // ==========================================
    // 2. LIVE CLOCK & DATE LOGIC
    // ==========================================
    const timeEl = document.getElementById('current-time');
    const dateEl = document.getElementById('date-details');
    const currentEl = document.getElementById('current-date');
    const islamicEl = document.getElementById('islamic-date');

    function updateTimeAndDate() {
        const now = new Date();
        if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        
        const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        if (dateEl) dateEl.textContent = dateStr;
        if (currentEl) currentEl.textContent = dateStr;
        
        if (islamicEl) {
            try { islamicEl.textContent = new Intl.DateTimeFormat('en-US-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' }).format(now); } catch(e) {}
        }
    }

    if (timeEl || dateEl || currentEl) { 
        setInterval(updateTimeAndDate, 1000); 
        updateTimeAndDate(); 
    }

    // ==========================================
    // 3. AUTO-ACTIVE NAVIGATION LINKS (FIXED)
    // ==========================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // FIX: Target all navigation links in sidebar, bottom nav, and mobile sheet
    const allNavLinks = document.querySelectorAll('.side-nav a, .bottom-nav a, .sheet-links a');
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        // Handle both relative and absolute paths
        if (href === currentPath || href === './' + currentPath || href === '/' + currentPath) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 4. SHARED MODAL & SHEET LOGIC
    // ==========================================
    const modalBackdrop = document.getElementById('modal-backdrop');
    const locationModal = document.getElementById('location-modal');
    const mobileNavSheet = document.getElementById('mobile-nav-sheet');

    const locationDisplay = document.getElementById('location-display');
    const closeLocBtn = document.getElementById('close-search-btn');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
     
    let activeModal = null; 

    function openModal(modalElement) {
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

    if (locationDisplay) locationDisplay.addEventListener('click', () => openModal(locationModal));
    if (closeLocBtn) closeLocBtn.addEventListener('click', closeModals);
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', () => openModal(mobileNavSheet));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeModals);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModals);

    // Mobile Drag-to-Close Logic
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
            if (currentY - startY > 100) closeModals();
            else modal.style.transform = 'translateY(0)';
        });
    });
});