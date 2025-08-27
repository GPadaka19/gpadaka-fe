import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export function OfflineHandler() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);
  const onlineHideTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);

      if (onlineHideTimer.current) {
        clearTimeout(onlineHideTimer.current);
      }
      setShowOnlineMessage(true);
      onlineHideTimer.current = window.setTimeout(() => {
        setShowOnlineMessage(false);
        onlineHideTimer.current = null;
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);

      if (onlineHideTimer.current) {
        clearTimeout(onlineHideTimer.current);
        onlineHideTimer.current = null;
      }
      setShowOnlineMessage(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (onlineHideTimer.current) {
        clearTimeout(onlineHideTimer.current);
        onlineHideTimer.current = null;
      }
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRetry = () => {
    // Try to reconnect
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
        }
      });
    }
    setShowOfflineMessage(false);
  };

  return (
    <AnimatePresence>
      {showOfflineMessage && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-yellow-500 text-yellow-900 p-4 shadow-lg"
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WifiOff className="h-5 w-5" />
              <span className="font-medium">
                You're currently offline. Some features may not work properly.
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRetry}
                className="px-3 py-1 bg-yellow-600 text-yellow-100 rounded hover:bg-yellow-700 transition-colors text-sm"
              >
                Retry
              </button>
              <button
                onClick={handleRefresh}
                className="px-3 py-1 bg-yellow-600 text-yellow-100 rounded hover:bg-yellow-700 transition-colors text-sm flex items-center space-x-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {showOnlineMessage && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-green-500 text-green-900 p-4 shadow-lg"
        >
          <div className="container mx-auto flex items-center justify-center space-x-2">
            <Wifi className="h-4 w-4" />
            <span className="text-md font-medium">
              Connection restored! You're back online.
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
