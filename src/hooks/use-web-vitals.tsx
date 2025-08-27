import { useEffect, useCallback } from 'react';

interface WebVitals {
  CLS: number;
  FID: number;
  FCP: number;
  LCP: number;
  TTFB: number;
}

export function useWebVitals() {
  // Monitor Cumulative Layout Shift (CLS)
  const monitorCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      let clsEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      // Report CLS when page is hidden
      const reportCLS = () => {
        if (clsValue > 0) {
          console.log('CLS:', clsValue);
          // Send to analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000) / 1000
            });
          }
        }
      };

      document.addEventListener('visibilitychange', reportCLS);
      window.addEventListener('beforeunload', reportCLS);

      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', reportCLS);
        window.removeEventListener('beforeunload', reportCLS);
      };
    }
  }, []);

  // Monitor First Input Delay (FID)
  const monitorFID = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = entry.processingStart - entry.startTime;
          console.log('FID:', fid);
          
          // Send to analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(fid)
            });
          }
        }
      });

      observer.observe({ entryTypes: ['first-input'] });

      return () => observer.disconnect();
    }
  }, []);

  // Monitor First Contentful Paint (FCP)
  const monitorFCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fcp = entry.startTime;
          console.log('FCP:', fcp);
          
          // Send to analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(fcp)
            });
          }
        }
      });

      observer.observe({ entryTypes: ['paint'] });

      return () => observer.disconnect();
    }
  }, []);

  // Monitor Largest Contentful Paint (LCP)
  const monitorLCP = useCallback(() => {
    if ('PerformanceObserver' in window) {
      let lcpValue = 0;

      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          lcpValue = entry.startTime;
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Report LCP when page is hidden
      const reportLCP = () => {
        if (lcpValue > 0) {
          console.log('LCP:', lcpValue);
          // Send to analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(lcpValue)
            });
          }
        }
      };

      document.addEventListener('visibilitychange', reportLCP);
      window.addEventListener('beforeunload', reportLCP);

      return () => {
        observer.disconnect();
        document.removeEventListener('visibilitychange', reportLCP);
        window.removeEventListener('beforeunload', reportLCP);
      };
    }
  }, []);

  // Monitor Time to First Byte (TTFB)
  const monitorTTFB = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const ttfb = (entry as any).responseStart - (entry as any).requestStart;
            console.log('TTFB:', ttfb);
            
            // Send to analytics
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('event', 'web_vitals', {
                event_category: 'Web Vitals',
                event_label: 'TTFB',
                value: Math.round(ttfb)
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });

      return () => observer.disconnect();
    }
  }, []);

  // Monitor resource loading performance
  const monitorResourcePerformance = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            const duration = resourceEntry.responseEnd - resourceEntry.requestStart;
            
            // Log slow resources
            if (duration > 1000) {
              console.warn('Slow resource:', resourceEntry.name, duration + 'ms');
            }
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const cleanupCLS = monitorCLS();
    const cleanupFID = monitorFID();
    const cleanupFCP = monitorFCP();
    const cleanupLCP = monitorLCP();
    const cleanupTTFB = monitorTTFB();
    const cleanupResource = monitorResourcePerformance();

    return () => {
      cleanupCLS?.();
      cleanupFID?.();
      cleanupFCP?.();
      cleanupLCP?.();
      cleanupTTFB?.();
      cleanupResource?.();
    };
  }, [monitorCLS, monitorFID, monitorFCP, monitorLCP, monitorTTFB, monitorResourcePerformance]);

  return {
    monitorCLS,
    monitorFID,
    monitorFCP,
    monitorLCP,
    monitorTTFB,
    monitorResourcePerformance
  };
}
