// src/app/utils/offlineHelper.js
// Helper functions to manage offline capabilities

export const checkOnlineStatus = () => {
  return navigator.onLine;
};

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered: ', registration);
      return registration;
    } catch (error) {
      console.error('SW registration failed: ', error);
    }
  }
};

export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (let registration of registrations) {
      await registration.unregister();
    }
  }
};

export const syncDataWhenOnline = async (callback) => {
  // Function to sync data when connection is restored
  if (navigator.onLine) {
    try {
      // Check for any pending offline operations in IndexedDB
      // This would be implemented based on specific requirements
      if (callback) callback();
    } catch (error) {
      console.error('Error syncing data:', error);
    }
  }
};

// Monitor online/offline status
export const monitorConnection = (onLineChange) => {
  window.addEventListener('online', () => {
    if (onLineChange) onLineChange(true);
    syncDataWhenOnline();
  });

  window.addEventListener('offline', () => {
    if (onLineChange) onLineChange(false);
  });

  return () => {
    window.removeEventListener('online', () => {});
    window.removeEventListener('offline', () => {});
  };
};

// Function to queue operations when offline
export const queueOperationWhenOffline = (operation, params) => {
  // Store the operation in IndexedDB to be executed when online
  const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  offlineQueue.push({
    operation,
    params,
    timestamp: Date.now()
  });
  localStorage.setItem('offlineQueue', JSON.stringify(offlineQueue));
};

// Process offline queue when online
export const processOfflineQueue = async () => {
  const offlineQueue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');

  if (offlineQueue.length > 0 && navigator.onLine) {
    // Process each queued operation
    for (const item of offlineQueue) {
      try {
        // Execute the operation
        // In a real app, this would call the appropriate function
        console.log('Processing offline operation:', item.operation, item.params);
      } catch (error) {
        console.error('Error processing offline operation:', error);
      }
    }

    // Clear the queue after processing
    localStorage.removeItem('offlineQueue');
  }
};