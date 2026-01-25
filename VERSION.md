# ⬆️ Version History

All notable changes to the **PrayTime** project will be documented in this file.

## [2.1.0] - 2026-01-25
### 🚀 New Features
- **Settings Dashboard:** Added a dedicated Settings page (`settings.html`) allowing users to customize the app experience.
- **Default Location System:** Users can now set a "Default City" in Settings. This location persists across the Home, Weather, and Settings pages automatically.
- **Centralized Location Logic:** Introduced `locate.js` to manage location state globally using LocalStorage.
- **About Section:** Added a modern "About" card in Settings with version info and update links.

### ⚡ Improvements
- **Smart Search:** Enhanced city search with auto-suggestions (debounced) on both the Weather and Settings pages.
- **Fajr Calculation:** Implemented smart calculation method detection (automatically switches to *Egyptian General Authority of Survey* for locations in Egypt to fix Fajr time accuracy).
- **Navigation:** Updated sidebar links to include the new Settings page.

### 🐛 Bug Fixes
- Fixed an issue where search dropdowns were hidden behind card containers (Z-Index/Overflow fix).
- Fixed navigation active states on sidebar.

---

## [2.0.0] - 2025-06-15
### 🌈 UI/UX Overhaul
- **Glassmorphism Design:** Complete UI redesign using modern glassmorphism trends (translucent cards, soft shadows).
- **Dark Mode:** Fully supported system-based and manual Dark/Light mode toggling.
- **Responsive Sidebar:** Added a collapsible sidebar with a hamburger menu for mobile devices.

### 🌤 Weather Module
- **Full Weather Page:** Added `weather.html` with real-time conditions.
- **Interactive Charts:** Integrated `Chart.js` to display hourly temperature curves and precipitation probability.
- **Air Quality:** Added a detailed Air Quality Index (AQI) card with pollutant breakdown (PM2.5, NO2, etc.).

---

## [1.0.0] - 2024-08-01
### 🎉 Initial Release
- **Core Functionality:** Accurate prayer times calculation using `Adhan.js`.
- **Geolocation:** Auto-detection of user location via browser GPS.
- **Countdown:** Next prayer countdown timer with progress bar.
- **Islamic Date:** Hijri date display.
