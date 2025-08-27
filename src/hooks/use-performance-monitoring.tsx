import { useEffect } from 'react';

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Monitor page load performance
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            console.log('Page Load Time:', navigationEntry.loadEventEnd - navigationEntry.loadEventStart);
            console.log('DOM Content Loaded:', navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart);
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });

      return () => observer.disconnect();
    }

    // Monitor scroll performance
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Log scroll performance metrics
        const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        console.log('Scroll Depth:', scrollDepth + '%');
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
}
