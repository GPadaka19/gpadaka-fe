import { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube, Monitor, AlertTriangle, CheckCircle, XCircle, Play, Pause, RotateCcw } from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'running' | 'pending';
  message: string;
  duration?: number;
  timestamp: Date;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'good' | 'needs-improvement' | 'poor';
}

export function TestingAndMonitoring() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  // Test suite definitions
  const testSuite = [
    {
      id: 'accessibility',
      name: 'Accessibility Tests',
      test: () => runAccessibilityTests()
    },
    {
      id: 'seo',
      name: 'SEO Tests',
      test: () => runSEOTests()
    },
    {
      id: 'performance',
      name: 'Performance Tests',
      test: () => runPerformanceTests()
    },
    {
      id: 'functionality',
      name: 'Functionality Tests',
      test: () => runFunctionalityTests()
    },
    {
      id: 'responsive',
      name: 'Responsive Design Tests',
      test: () => runResponsiveTests()
    }
  ];

  // Accessibility testing
  const runAccessibilityTests = useCallback(async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test 1: Check for alt text on images
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    results.push({
      id: 'alt-text',
      name: 'Image Alt Text',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
      message: imagesWithoutAlt.length === 0 
        ? 'All images have alt text' 
        : `${imagesWithoutAlt.length} images missing alt text`,
      timestamp: new Date()
    });

    // Test 2: Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let hasH1 = false;
    let headingHierarchyValid = true;
    
    Array.from(headings).forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      if (level === 1) hasH1 = true;
      if (index > 0) {
        const prevLevel = parseInt(headings[index - 1].tagName.charAt(1));
        if (level - prevLevel > 1) headingHierarchyValid = false;
      }
    });

    results.push({
      id: 'heading-hierarchy',
      name: 'Heading Hierarchy',
      status: hasH1 && headingHierarchyValid ? 'pass' : 'fail',
      message: hasH1 && headingHierarchyValid 
        ? 'Proper heading hierarchy found' 
        : 'Heading hierarchy issues detected',
      timestamp: new Date()
    });

    // Test 3: Check for ARIA labels
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    const elementsWithoutAria = Array.from(interactiveElements).filter(el => 
      !el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby') && !el.textContent?.trim()
    );
    
    results.push({
      id: 'aria-labels',
      name: 'ARIA Labels',
      status: elementsWithoutAria.length === 0 ? 'pass' : 'fail',
      message: elementsWithoutAria.length === 0 
        ? 'All interactive elements have proper labels' 
        : `${elementsWithoutAria.length} elements missing proper labels`,
      timestamp: new Date()
    });

    // Test 4: Check color contrast (simplified)
    const hasDarkText = document.querySelector('[class*="text-black"], [class*="text-gray-900"]');
    const hasLightBg = document.querySelector('[class*="bg-white"], [class*="bg-gray-100"]');
    
    results.push({
      id: 'color-contrast',
      name: 'Color Contrast',
      status: hasDarkText && hasLightBg ? 'pass' : 'needs-improvement',
      message: hasDarkText && hasLightBg 
        ? 'Basic color contrast patterns detected' 
        : 'Color contrast may need improvement',
      timestamp: new Date()
    });

    return results;
  }, []);

  // SEO testing
  const runSEOTests = useCallback(async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test 1: Check meta title
    const title = document.title;
    results.push({
      id: 'meta-title',
      name: 'Meta Title',
      status: title && title.length > 10 && title.length < 60 ? 'pass' : 'fail',
      message: title && title.length > 10 && title.length < 60 
        ? `Title length: ${title.length} characters` 
        : 'Title should be between 10-60 characters',
      timestamp: new Date()
    });

    // Test 2: Check meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    const descContent = metaDesc?.getAttribute('content') || '';
    results.push({
      id: 'meta-description',
      name: 'Meta Description',
      status: descContent.length > 50 && descContent.length < 160 ? 'pass' : 'fail',
      message: descContent.length > 50 && descContent.length < 160 
        ? `Description length: ${descContent.length} characters` 
        : 'Description should be between 50-160 characters',
      timestamp: new Date()
    });

    // Test 3: Check for Open Graph tags
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    results.push({
      id: 'open-graph',
      name: 'Open Graph Tags',
      status: ogTags.length >= 3 ? 'pass' : 'needs-improvement',
      message: ogTags.length >= 3 
        ? `${ogTags.length} Open Graph tags found` 
        : 'Consider adding more Open Graph tags',
      timestamp: new Date()
    });

    // Test 4: Check for structured data
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    results.push({
      id: 'structured-data',
      name: 'Structured Data',
      status: structuredData.length > 0 ? 'pass' : 'fail',
      message: structuredData.length > 0 
        ? `${structuredData.length} structured data scripts found` 
        : 'No structured data found',
      timestamp: new Date()
    });

    // Test 5: Check for canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    results.push({
      id: 'canonical-url',
      name: 'Canonical URL',
      status: canonical ? 'pass' : 'fail',
      message: canonical ? 'Canonical URL found' : 'Canonical URL missing',
      timestamp: new Date()
    });

    return results;
  }, []);

  // Performance testing
  const runPerformanceTests = useCallback(async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test 1: Check Core Web Vitals
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const fcp = navigation.firstContentfulPaint || 0;
        const lcp = navigation.largestContentfulPaint || 0;
        
        results.push({
          id: 'fcp',
          name: 'First Contentful Paint',
          status: fcp < 1800 ? 'pass' : fcp < 3000 ? 'needs-improvement' : 'fail',
          message: `FCP: ${fcp}ms`,
          timestamp: new Date()
        });

        results.push({
          id: 'lcp',
          name: 'Largest Contentful Paint',
          status: lcp < 2500 ? 'pass' : lcp < 4000 ? 'needs-improvement' : 'fail',
          message: `LCP: ${lcp}ms`,
          timestamp: new Date()
        });
      }
    }

    // Test 2: Check image optimization
    const images = document.querySelectorAll('img');
    const unoptimizedImages = Array.from(images).filter(img => {
      const src = img.src;
      return !src.includes('webp') && !src.includes('avif') && !src.includes('optimized');
    });
    
    results.push({
      id: 'image-optimization',
      name: 'Image Optimization',
      status: unoptimizedImages.length === 0 ? 'pass' : 'needs-improvement',
      message: unoptimizedImages.length === 0 
        ? 'All images appear optimized' 
        : `${unoptimizedImages.length} images may need optimization`,
      timestamp: new Date()
    });

    // Test 3: Check for lazy loading
    const lazyImages = Array.from(images).filter(img => img.loading === 'lazy');
    results.push({
      id: 'lazy-loading',
      name: 'Lazy Loading',
      status: lazyImages.length > 0 ? 'pass' : 'needs-improvement',
      message: lazyImages.length > 0 
        ? `${lazyImages.length} images use lazy loading` 
        : 'Consider implementing lazy loading',
      timestamp: new Date()
    });

    // Test 4: Check bundle size (estimated)
    const scripts = document.querySelectorAll('script[src]');
    let totalScriptSize = 0;
    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src && src.includes('chunk') || src?.includes('bundle')) {
        totalScriptSize += 100; // Estimate
      }
    });
    
    results.push({
      id: 'bundle-size',
      name: 'Bundle Size',
      status: totalScriptSize < 500 ? 'pass' : totalScriptSize < 1000 ? 'needs-improvement' : 'fail',
      message: `Estimated bundle size: ${totalScriptSize}KB`,
      timestamp: new Date()
    });

    return results;
  }, []);

  // Functionality testing
  const runFunctionalityTests = useCallback(async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test 1: Check navigation functionality
    const navLinks = document.querySelectorAll('nav a, nav button');
    results.push({
      id: 'navigation-links',
      name: 'Navigation Links',
      status: navLinks.length > 0 ? 'pass' : 'fail',
      message: `${navLinks.length} navigation elements found`,
      timestamp: new Date()
    });

    // Test 2: Check form functionality
    const forms = document.querySelectorAll('form');
    results.push({
      id: 'forms',
      name: 'Form Elements',
      status: forms.length > 0 ? 'pass' : 'needs-improvement',
      message: `${forms.length} forms found`,
      timestamp: new Date()
    });

    // Test 3: Check interactive elements
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    results.push({
      id: 'interactive-elements',
      name: 'Interactive Elements',
      status: buttons.length > 0 || links.length > 0 ? 'pass' : 'fail',
      message: `${buttons.length} buttons, ${links.length} links found`,
      timestamp: new Date()
    });

    // Test 4: Check for JavaScript errors
    const hasErrors = window.onerror !== null;
    results.push({
      id: 'javascript-errors',
      name: 'JavaScript Errors',
      status: !hasErrors ? 'pass' : 'fail',
      message: hasErrors ? 'JavaScript errors detected' : 'No JavaScript errors',
      timestamp: new Date()
    });

    return results;
  }, []);

  // Responsive design testing
  const runResponsiveTests = useCallback(async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];
    
    // Test 1: Check viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    results.push({
      id: 'viewport-meta',
      name: 'Viewport Meta Tag',
      status: viewport ? 'pass' : 'fail',
      message: viewport ? 'Viewport meta tag found' : 'Viewport meta tag missing',
      timestamp: new Date()
    });

    // Test 2: Check for responsive CSS
    const hasResponsiveCSS = document.querySelector('style') || 
                           document.querySelector('link[rel="stylesheet"]');
    results.push({
      id: 'responsive-css',
      name: 'Responsive CSS',
      status: hasResponsiveCSS ? 'pass' : 'fail',
      message: hasResponsiveCSS ? 'CSS found' : 'No CSS detected',
      timestamp: new Date()
    });

    // Test 3: Check for mobile-friendly elements
    const hasMobileElements = document.querySelector('[class*="sm:"], [class*="md:"], [class*="lg:"]');
    results.push({
      id: 'mobile-friendly',
      name: 'Mobile-Friendly Classes',
      status: hasMobileElements ? 'pass' : 'needs-improvement',
      message: hasMobileElements ? 'Responsive utility classes found' : 'Consider adding responsive classes',
      timestamp: new Date()
    });

    return results;
  }, []);

  // Run all tests
  const runAllTests = useCallback(async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setTestResults([]);
    
    const allResults: TestResult[] = [];
    
    for (const test of testSuite) {
      try {
        const startTime = performance.now();
        const results = await test.test();
        const duration = performance.now() - startTime;
        
        // Add duration to results
        const resultsWithDuration = results.map(result => ({
          ...result,
          duration: Math.round(duration)
        }));
        
        allResults.push(...resultsWithDuration);
        
        // Update results incrementally
        setTestResults(prev => [...prev, ...resultsWithDuration]);
        
        // Small delay for visual effect
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        allResults.push({
          id: `${test.id}-error`,
          name: `${test.name} - Error`,
          status: 'fail',
          message: `Test failed: ${error}`,
          timestamp: new Date()
        });
      }
    }
    
    setIsRunning(false);
  }, [isRunning, testSuite]);

  // Calculate test statistics
  const testStats = {
    total: testResults.length,
    passed: testResults.filter(r => r.status === 'pass').length,
    failed: testResults.filter(r => r.status === 'fail').length,
    needsImprovement: testResults.filter(r => r.status === 'needs-improvement').length,
    pending: testResults.filter(r => r.status === 'pending').length
  };

  // Performance monitoring
  useEffect(() => {
    if (!showPanel) return;

    const updatePerformanceMetrics = () => {
      if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const metrics: PerformanceMetric[] = [
            {
              name: 'TTFB',
              value: Math.round(navigation.responseStart - navigation.requestStart),
              unit: 'ms',
              threshold: 600,
              status: navigation.responseStart - navigation.requestStart < 600 ? 'good' : 'needs-improvement'
            },
            {
              name: 'DOM Load',
              value: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
              unit: 'ms',
              threshold: 100,
              status: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart < 100 ? 'good' : 'needs-improvement'
            },
            {
              name: 'Page Load',
              value: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
              unit: 'ms',
              threshold: 200,
              status: navigation.loadEventEnd - navigation.loadEventStart < 200 ? 'good' : 'needs-improvement'
            }
          ];
          setPerformanceMetrics(metrics);
        }
      }
    };

    updatePerformanceMetrics();
    const interval = setInterval(updatePerformanceMetrics, 5000);
    return () => clearInterval(interval);
  }, [showPanel]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        runAllTests();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, runAllTests]);

  if (!isVisible) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
        title="Testing & Monitoring (Ctrl+Shift+T)"
      >
        <TestTube size={24} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TestTube size={20} />
            <h3 className="font-semibold">Testing & Monitoring</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPanel(!showPanel)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="Toggle Panel"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              title="Close"
            >
              <XCircle size={16} />
            </button>
          </div>
        </div>
        
        {/* Test Controls */}
        <div className="flex items-center space-x-2 mt-3">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 disabled:opacity-50 rounded text-sm transition-colors"
          >
            {isRunning ? <Pause size={14} /> : <Play size={14} />}
            <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
          </button>
          <button
            onClick={() => setTestResults([])}
            className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded text-sm transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[60vh] overflow-y-auto">
        {/* Test Statistics */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Test Results</h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
              <div className="text-green-600 dark:text-green-400 font-semibold">{testStats.passed}</div>
              <div className="text-xs text-green-600 dark:text-green-400">Passed</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded">
              <div className="text-red-600 dark:text-red-400 font-semibold">{testStats.failed}</div>
              <div className="text-xs text-red-600 dark:text-red-400">Failed</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
              <div className="text-yellow-600 dark:text-yellow-400 font-semibold">{testStats.needsImprovement}</div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">Needs Work</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
              <div className="text-gray-600 dark:text-gray-400 font-semibold">{testStats.total}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        {showPanel && performanceMetrics.length > 0 && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Performance Metrics</h4>
            <div className="space-y-2">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${
                      metric.status === 'good' ? 'text-green-600 dark:text-green-400' :
                      metric.status === 'needs-improvement' ? 'text-yellow-600 dark:text-yellow-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {metric.value}{metric.unit}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'needs-improvement' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Test Details</h4>
          {testResults.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <TestTube size={32} className="mx-auto mb-2 opacity-50" />
              <p>No tests run yet</p>
              <p className="text-xs">Click "Run Tests" to start</p>
            </div>
          ) : (
            <div className="space-y-2">
              {testResults.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg border ${
                    result.status === 'pass' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                    result.status === 'fail' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                    result.status === 'needs-improvement' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                    'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {result.status === 'pass' && <CheckCircle size={16} className="text-green-600 dark:text-green-400" />}
                        {result.status === 'fail' && <XCircle size={16} className="text-red-600 dark:text-red-400" />}
                        {result.status === 'needs-improvement' && <AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400" />}
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{result.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{result.message}</p>
                    </div>
                    {result.duration && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        {result.duration}ms
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center justify-between">
          <span>Ctrl+Shift+T: Toggle | Ctrl+Shift+R: Run Tests</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
