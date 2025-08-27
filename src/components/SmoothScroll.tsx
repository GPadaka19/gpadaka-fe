import { useEffect } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle initial hash on page load
    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Wait for page to be fully rendered
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }, 300);
        }
      }
    };

    // Handle hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Set up event listeners
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial hash after a short delay
    const timer = setTimeout(handleInitialHash, 100);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
      // Restore default scroll behavior
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
}
