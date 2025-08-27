/**
 * Utility functions for smooth scrolling and hash navigation
 */

export const scrollToSection = (hash: string, offset: number = 0) => {
  const element = document.querySelector(hash);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const handleHashNavigation = (hash: string) => {
  if (hash) {
    // Remove the # symbol
    const cleanHash = hash.startsWith('#') ? hash : `#${hash}`;
    
    // Update URL without triggering scroll
    window.history.replaceState(null, '', cleanHash);
    
    // Scroll to section after a short delay
    setTimeout(() => {
      scrollToSection(cleanHash, 80); // 80px offset for fixed navigation
    }, 100);
  }
};

export const isElementInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
