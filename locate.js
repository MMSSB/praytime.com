// src/locate.js

const LocationManager = {
    // Key used in LocalStorage
    STORAGE_KEY: 'savedLocation',

    /**
     * Save location to storage
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {string} name - City Name
     * @param {string} country - Country Name
     */
    save: function(lat, lon, name, country = '') {
        const data = { 
            lat: parseFloat(lat), 
            lon: parseFloat(lon), 
            name: name, 
            country: country,
            type: 'manual' 
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        console.log('Location saved:', data);
        
        // Notify other parts of the app that location changed
        window.dispatchEvent(new CustomEvent('locationUpdated', { detail: data }));
    },

    /**
     * Get the saved location
     * @returns {object|null} The saved location object or null
     */
    get: function() {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        return saved ? JSON.parse(saved) : null;
    },

    /**
     * Clear saved location
     */
    clear: function() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};