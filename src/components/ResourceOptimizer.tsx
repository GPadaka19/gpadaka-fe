import { useEffect } from 'react';

export function ResourceOptimizer() {
  useEffect(() => {
    // Add preload hints for critical resources
    const addPreloadHints = () => {
      const preloadLinks = [
        { href: '/src/index.css', as: 'style' },
        { href: '/src/App.css', as: 'style' },
        { href: '/public/GP-no-bg.png', as: 'image' },
        { href: '/public/profile-photo.jpg', as: 'image' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap', as: 'style' }
      ];

      preloadLinks.forEach(({ href, as }) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as as any;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Add DNS prefetch for external domains
    const addDNSPrefetch = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Add resource hints for better performance
    const addResourceHints = () => {
      // Preconnect to external domains
      const preconnectDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
        if (!img.decoding) {
          img.decoding = 'async';
        }
      });
    };

    // Add intersection observer for lazy loading
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
              }
            }
          });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    };

    // Execute optimizations
    addPreloadHints();
    addDNSPrefetch();
    addResourceHints();
    optimizeImages();
    setupLazyLoading();

    // Cleanup function
    return () => {
      // Remove any dynamically added elements if needed
      const preloadLinks = document.querySelectorAll('link[rel="preload"]');
      preloadLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  return null;
}
