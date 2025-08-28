import { useEffect } from 'react';

export function useServiceWorker() {
  useEffect(() => {
    // Only register service worker in production
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
          });
          console.log('Service Worker registered successfully:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('New version available');
                  // You can show a notification to the user here
                }
              });
            }
          });

          // Handle service worker updates
          let refreshing = false;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
              refreshing = true;
              window.location.reload();
            }
          });

        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      };

      registerSW();
    }
  }, []);

  // Function to check if app is online
  const isOnline = () => navigator.onLine;

  // Function to check if app is offline
  const isOffline = () => !navigator.onLine;

  // Function to get network status
  const getNetworkStatus = () => ({
    online: navigator.onLine,
    effectiveType: (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection?.effectiveType || 'unknown',
    downlink: (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection?.downlink || 0,
    rtt: (navigator as Navigator & { connection?: { effectiveType?: string; downlink?: number; rtt?: number } }).connection?.rtt || 0
  });

  return {
    isOnline,
    isOffline,
    getNetworkStatus
  };
}
