//    document.addEventListener('DOMContentLoaded', () => {
//     const hamburger = document.getElementById('hamburger');
//     const sidebar = document.getElementById('sidebar');
   
//    });
//    // Handle tab switching
//     todayButton.addEventListener('click', () => {
//         todayButton.classList.add('active');
//         tomorrowButton.classList.remove('active');
//         timesListToday.style.display = 'block';
//         timesListTomorrow.style.display = 'none';
//     });

//     tomorrowButton.addEventListener('click', () => {
//         tomorrowButton.classList.add('active');
//         todayButton.classList.remove('active');
//         timesListToday.style.display = 'none';
//         timesListTomorrow.style.display = 'block';
//     });


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


//     // Add this at the top of each JS file (after DOMContentLoaded)
// function applyTheme(theme) {
//     const body = document.body;
//     body.classList.remove('light', 'dark');
    
//     if (theme === 'system') {
//         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//             body.classList.add('dark');
//         } else {
//             body.classList.add('light');
//         }
//     } else {
//         body.classList.add(theme);
//     }
// }

// const savedTheme = localStorage.getItem('theme') || 'system';
// applyTheme(savedTheme);

// // Listen for system theme changes
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
//     if (localStorage.getItem('theme') === 'system') {
//         applyTheme('system');
//     }
// });


document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selection ---
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    // Ensure elements exist before adding listeners
    if (hamburger && sidebar) {
        // --- Hamburger Menu Logic ---
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

        // Handle window resize to hide sidebar on larger screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
            }
        });
    }

    // --- Theme (Dark Mode) Logic ---

    // Function to apply the correct theme class to the body
    function applyTheme(theme) {
        const body = document.body;
        body.classList.remove('light', 'dark'); // Remove previous theme classes

        if (theme === 'system') {
            // Check the user's system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark');
            } else {
                body.classList.add('light');
            }
        } else {
            // Apply the explicitly chosen theme (e.g., 'light' or 'dark')
            body.classList.add(theme);
        }
    }

    // Apply the saved theme on initial page load
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Listen for changes in the system's theme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentTheme = localStorage.getItem('theme') || 'system';
        // Only re-apply the theme if the user has selected "system"
        if (currentTheme === 'system') {
            applyTheme('system');
        }
    });
});