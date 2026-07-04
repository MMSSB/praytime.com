# ⬆️ Version History

All notable changes to the **PrayTime** project will be documented in this file.

## [3.0.0] - 2026-07-04
### 🚀 New Features
- **Quran Module:** Added a comprehensive Quran reading page (`quran.html`) with Surah, Juz, and Bookmark tabs, adjustable Arabic and English text sizing, and reading streak tracking[cite: 6].
- **Audio Lounge:** Introduced a dedicated audio experience (`q-audio.html`) featuring an Apple Music-style full-screen player, a floating mini-player, and an advanced proportional sync algorithm for synchronized reading[cite: 5].
- **Masjid Finder:** Added an interactive map locator (`masjid-finder.html`) that allows users to find nearby mosques within a 5km radius in real-time[cite: 4].

### ⚡ Improvements
- **Navigation:** Updated the sidebar and mobile bottom navigation menus across all pages to feature the new Quran, Audio, and Masjid Finder links[cite: 3, 4, 5, 6].
- **Expanded Settings:** The settings sheet now includes extensive preferences for the Quran and Audio modules, including master reciter selection, translation language, and Arabic font styles (Amiri/Uthmani)[cite: 5, 6].
- **Version Bump:** Updated the application "About" badge in the settings to reflect v3.0[cite: 7].

---

## [2.1.0] - 2026-01-25
### 🚀 New Features
- **Settings Dashboard:** Added a dedicated Settings page (`settings.html`) allowing users to customize the app experience[cite: 1].
- **Default Location System:** Users can now set a "Default City" in Settings[cite: 1]. This location persists across the Home, Weather, and Settings pages automatically[cite: 1].
- **Centralized Location Logic:** Introduced `locate.js` to manage location state globally using LocalStorage[cite: 1].
- **About Section:** Added a modern "About" card in Settings with version info and update links[cite: 1].

### ⚡ Improvements
- **Smart Search:** Enhanced city search with auto-suggestions (debounced) on both the Weather and Settings pages[cite: 1].
- **Fajr Calculation:** Implemented smart calculation method detection (automatically switches to *Egyptian General Authority of Survey* for locations in Egypt to fix Fajr time accuracy)[cite: 1].
- **Navigation:** Updated sidebar links to include the new Settings page[cite: 1].

### 🐛 Bug Fixes
- Fixed an issue where search dropdowns were hidden behind card containers (Z-Index/Overflow fix)[cite: 1].
- Fixed navigation active states on sidebar[cite: 1].

---

## [2.0.0] - 2025-06-15
### 🌈 UI/UX Overhaul
- **Glassmorphism Design:** Complete UI redesign using modern glassmorphism trends (translucent cards, soft shadows)[cite: 1].
- **Dark Mode:** Fully supported system-based and manual Dark/Light mode toggling[cite: 1].
- **Responsive Sidebar:** Added a collapsible sidebar with a hamburger menu for mobile devices[cite: 1].

### 🌤 Weather Module
- **Full Weather Page:** Added `weather.html` with real-time conditions[cite: 1].
- **Interactive Charts:** Integrated `Chart.js` to display hourly temperature curves and precipitation probability[cite: 1].
- **Air Quality:** Added a detailed Air Quality Index (AQI) card with pollutant breakdown (PM2.5, NO2, etc.)[cite: 1].

---

## [1.0.0] - 2024-08-01
### 🎉 Initial Release
- **Core Functionality:** Accurate prayer times calculation using `Adhan.js`[cite: 1].
- **Geolocation:** Auto-detection of user location via browser GPS[cite: 1].
- **Countdown:** Next prayer countdown timer with progress bar[cite: 1].
- **Islamic Date:** Hijri date display[cite: 1].
