import { useEffect, useCallback } from 'react';

export function DevelopmentTools() {
  // Add development toolbar
  const addDevToolbar = useCallback(() => {
    if (process.env.NODE_ENV !== 'development') return;
    
    // Check if toolbar already exists
    if (document.querySelector('#dev-toolbar')) return;

    const toolbar = document.createElement('div');
    toolbar.id = 'dev-toolbar';
    toolbar.className = 'fixed bottom-4 left-4 z-50 bg-background border border-border rounded-lg shadow-lg p-3';
    toolbar.innerHTML = `
      <div class="text-xs font-medium text-muted-foreground mb-2">Dev Tools</div>
      <div class="space-y-1">
        <button id="dev-toggle-theme" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          Toggle Theme
        </button>
        <button id="dev-toggle-nav" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          Toggle Navigation
        </button>
        <button id="dev-scroll-test" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          Test Scroll
        </button>
        <button id="dev-performance" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          Performance
        </button>
        <button id="dev-accessibility" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          Accessibility
        </button>
        <button id="dev-seo" class="w-full text-left px-2 py-1 text-xs rounded hover:bg-muted transition-colors">
          SEO Check
        </button>
      </div>
    `;

    // Add event listeners
    toolbar.addEventListener('click', (e) => {
      const button = e.target as HTMLElement;
      if (button.tagName === 'BUTTON') {
        const action = button.id;
        
        switch (action) {
          case 'dev-toggle-theme':
            document.documentElement.classList.toggle('dark');
            break;
            
          case 'dev-toggle-nav':
            const nav = document.querySelector('nav');
            if (nav) {
              nav.classList.toggle('hidden');
            }
            break;
            
          case 'dev-scroll-test':
            // Test smooth scrolling to different sections
            const sections = ['#about', '#skills', '#projects', '#experience', '#contact'];
            const randomSection = sections[Math.floor(Math.random() * sections.length)];
            const element = document.querySelector(randomSection);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
            break;
            
          case 'dev-performance':
            // Show performance metrics
            if ('performance' in window) {
              const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
              if (navigation) {
                console.group('🚀 Performance Metrics');
                console.log('Page Load Time:', navigation.loadEventEnd - navigation.navigationStart, 'ms');
                console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
                console.log('First Paint:', performance.getEntriesByType('paint')[0]?.startTime || 'N/A', 'ms');
                console.groupEnd();
              }
            }
            break;
            
          case 'dev-accessibility':
            // Run accessibility checks
            const images = document.querySelectorAll('img');
            const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
            console.group('♿ Accessibility Check');
            console.log('Images without alt:', imagesWithoutAlt.length);
            console.log('Total images:', images.length);
            console.groupEnd();
            break;
            
          case 'dev-seo':
            // Run SEO checks
            const title = document.title;
            const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
            console.group('🔍 SEO Check');
            console.log('Title length:', title.length, '/ 60');
            console.log('Description length:', description?.length || 0, '/ 160');
            console.log('Canonical URL:', document.querySelector('link[rel="canonical"]')?.getAttribute('href') || 'Missing');
            console.groupEnd();
            break;
        }
      }
    });

    document.body.appendChild(toolbar);
  }, []);

  // Add keyboard shortcuts for development
  const addKeyboardShortcuts = useCallback(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + D: Toggle dev toolbar
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const toolbar = document.querySelector('#dev-toolbar');
        if (toolbar) {
          toolbar.classList.toggle('hidden');
        }
      }

      // Ctrl/Cmd + Shift + T: Toggle theme
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        document.documentElement.classList.toggle('dark');
      }

      // Ctrl/Cmd + Shift + P: Performance panel
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        if ('performance' in window) {
          console.group('🚀 Performance Panel');
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (navigation) {
            console.table({
              'Page Load Time': `${navigation.loadEventEnd - navigation.navigationStart}ms`,
              'DOM Content Loaded': `${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`,
              'First Paint': `${performance.getEntriesByType('paint')[0]?.startTime || 'N/A'}ms`
            });
          }
          console.groupEnd();
        }
      }

      // Ctrl/Cmd + Shift + A: Accessibility check
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        console.group('♿ Accessibility Check');
        const images = document.querySelectorAll('img');
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        console.table({
          'Total Images': images.length,
          'Images without alt': Array.from(images).filter(img => !img.alt).length,
          'Total Headings': headings.length,
          'Heading Levels': Array.from(headings).map(h => h.tagName).join(', ')
        });
        console.groupEnd();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add development info panel
  const addDevInfoPanel = useCallback(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const panel = document.createElement('div');
    panel.id = 'dev-info-panel';
    panel.className = 'fixed top-4 left-4 z-50 bg-background border border-border rounded-lg shadow-lg p-3 text-xs';
    panel.innerHTML = `
      <div class="font-medium text-muted-foreground mb-2">Dev Info</div>
      <div class="space-y-1">
        <div>Environment: <span class="text-green-500">Development</span></div>
        <div>Build: <span class="text-blue-500">${new Date().toLocaleTimeString()}</span></div>
        <div>User Agent: <span class="text-purple-500">${navigator.userAgent.split(' ')[0]}</span></div>
        <div>Viewport: <span class="text-orange-500">${window.innerWidth}x${window.innerHeight}</span></div>
      </div>
    `;

    document.body.appendChild(panel);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        addDevToolbar();
        addDevInfoPanel();
      }, 1000);

      const cleanupKeyboard = addKeyboardShortcuts();

      return () => {
        clearTimeout(timer);
        cleanupKeyboard?.();
        
        // Cleanup dev tools
        const toolbar = document.querySelector('#dev-toolbar');
        const infoPanel = document.querySelector('#dev-info-panel');
        if (toolbar) toolbar.remove();
        if (infoPanel) infoPanel.remove();
      };
    }
  }, [addDevToolbar, addDevInfoPanel, addKeyboardShortcuts]);

  return null;
}
