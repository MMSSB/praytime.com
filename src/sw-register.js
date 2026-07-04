if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      // Auto-update check: If you push new code to GitHub, the app alerts the user
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            if(confirm("New update available! Refresh to update app.")) {
              window.location.reload(true);
            }
          }
        });
      });
    });
  });
}