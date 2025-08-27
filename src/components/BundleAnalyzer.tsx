import { useEffect, useCallback } from 'react';

export function BundleAnalyzer() {
  // Analyze bundle size and performance
  const analyzeBundle = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Get performance timing
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          console.group('🚀 Bundle Performance Analysis');
          console.log('Total Page Load Time:', navigation.loadEventEnd - navigation.navigationStart, 'ms');
          console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
          console.log('First Paint:', performance.getEntriesByType('paint')[0]?.startTime || 'N/A', 'ms');
          console.log('Time to First Byte:', navigation.responseStart - navigation.requestStart, 'ms');
          console.groupEnd();
        }
      }

      // Analyze resource loading
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => 
        (resource as PerformanceResourceTiming).duration > 1000
      );

      if (slowResources.length > 0) {
        console.group('🐌 Slow Resources (>1s)');
        slowResources.forEach(resource => {
          const res = resource as PerformanceResourceTiming;
          console.log(`${res.name}: ${res.duration}ms`);
        });
        console.groupEnd();
      }

      // Analyze JavaScript bundle
      const jsResources = resources.filter(resource => 
        resource.name.endsWith('.js') || resource.name.includes('chunk')
      );

      if (jsResources.length > 0) {
        console.group('📦 JavaScript Bundles');
        jsResources.forEach(resource => {
          const res = resource as PerformanceResourceTiming;
          console.log(`${res.name}: ${res.duration}ms (${(res.transferSize / 1024).toFixed(2)}KB)`);
        });
        console.groupEnd();
      }

      // Analyze CSS resources
      const cssResources = resources.filter(resource => 
        resource.name.endsWith('.css')
      );

      if (cssResources.length > 0) {
        console.group('🎨 CSS Resources');
        cssResources.forEach(resource => {
          const res = resource as PerformanceResourceTiming;
          console.log(`${res.name}: ${res.duration}ms (${(res.transferSize / 1024).toFixed(2)}KB)`);
        });
        console.groupEnd();
      }
    }
  }, []);

  // Monitor memory usage
  const monitorMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      console.group('💾 Memory Usage');
      console.log('Used JS Heap Size:', (memory.usedJSHeapSize / 1024 / 1024).toFixed(2), 'MB');
      console.log('Total JS Heap Size:', (memory.totalJSHeapSize / 1024 / 1024).toFixed(2), 'MB');
      console.log('JS Heap Size Limit:', (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2), 'MB');
      console.groupEnd();
    }
  }, []);

  // Monitor network conditions
  const monitorNetwork = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      console.group('🌐 Network Conditions');
      console.log('Effective Type:', connection.effectiveType);
      console.log('Downlink:', connection.downlink, 'Mbps');
      console.log('RTT:', connection.rtt, 'ms');
      console.log('Save Data:', connection.saveData);
      console.groupEnd();
    }
  }, []);

  // Analyze component render performance
  const analyzeComponentPerformance = useCallback(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`⏱️ Component Render: ${entry.name} took ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Run analysis after page load
    const timer = setTimeout(() => {
      analyzeBundle();
      monitorMemory();
      monitorNetwork();
    }, 2000);

    // Set up component performance monitoring
    const cleanupPerformance = analyzeComponentPerformance();

    // Monitor for performance issues
    const performanceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const nav = entry as PerformanceNavigationTiming;
          const loadTime = nav.loadEventEnd - nav.navigationStart;
          
          if (loadTime > 5000) {
            console.warn('⚠️ Slow page load detected:', loadTime + 'ms');
          }
        }
      });
    });

    performanceObserver.observe({ entryTypes: ['navigation'] });

    return () => {
      clearTimeout(timer);
      cleanupPerformance?.();
      performanceObserver.disconnect();
    };
  }, [analyzeBundle, monitorMemory, monitorNetwork, analyzeComponentPerformance]);

  return null;
}
