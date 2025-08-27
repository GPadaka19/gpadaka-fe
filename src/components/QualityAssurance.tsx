import { useEffect, useCallback } from 'react';

export function QualityAssurance() {
  // Validate HTML structure
  const validateHTMLStructure = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for required sections
      const requiredSections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const missingSections = requiredSections.filter(section => 
        !document.querySelector(`#${section}`)
      );

      if (missingSections.length > 0) {
        console.warn('⚠️ Missing required sections:', missingSections);
      }

      // Check for required meta tags
      const requiredMetaTags = ['description', 'keywords', 'author'];
      const missingMetaTags = requiredMetaTags.filter(tag => 
        !document.querySelector(`meta[name="${tag}"]`)
      );

      if (missingMetaTags.length > 0) {
        console.warn('⚠️ Missing required meta tags:', missingMetaTags);
      }

      // Check for required Open Graph tags
      const requiredOGTags = ['og:title', 'og:description', 'og:type', 'og:url'];
      const missingOGTags = requiredOGTags.filter(tag => 
        !document.querySelector(`meta[property="${tag}"]`)
      );

      if (missingOGTags.length > 0) {
        console.warn('⚠️ Missing required Open Graph tags:', missingOGTags);
      }
    }
  }, []);

  // Validate accessibility
  const validateAccessibility = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for alt attributes on images
      const images = document.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
      
      if (imagesWithoutAlt.length > 0) {
        console.warn('⚠️ Images without alt attributes:', imagesWithoutAlt.length);
      }

      // Check for proper heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      let hasErrors = false;

      headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > previousLevel + 1) {
          console.warn('⚠️ Skipped heading level:', heading.tagName, heading.textContent);
          hasErrors = true;
        }
        previousLevel = level;
      });

      // Check for proper form labels
      const formInputs = document.querySelectorAll('input, textarea, select');
      const inputsWithoutLabels = Array.from(formInputs).filter(input => {
        const id = input.id;
        const label = document.querySelector(`label[for="${id}"]`);
        return !label && !input.getAttribute('aria-label');
      });

      if (inputsWithoutLabels.length > 0) {
        console.warn('⚠️ Form inputs without labels:', inputsWithoutLabels.length);
      }
    }
  }, []);

  // Validate performance
  const validatePerformance = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for large images
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
          console.warn('⚠️ Large image detected:', img.src, `${img.naturalWidth}x${img.naturalHeight}`);
        }
      });

      // Check for unused CSS
      const styleSheets = Array.from(document.styleSheets);
      const externalStylesheets = styleSheets.filter(sheet => sheet.href);
      
      if (externalStylesheets.length > 3) {
        console.warn('⚠️ Many external stylesheets detected:', externalStylesheets.length);
      }

      // Check for console errors
      const originalError = console.error;
      let errorCount = 0;
      
      console.error = (...args) => {
        errorCount++;
        originalError.apply(console, args);
        
        if (errorCount > 5) {
          console.warn('⚠️ Many console errors detected:', errorCount);
        }
      };
    }
  }, []);

  // Validate SEO
  const validateSEO = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      // Check for duplicate IDs
      const allElements = document.querySelectorAll('[id]');
      const ids = Array.from(allElements).map(el => el.id);
      const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
      
      if (duplicateIds.length > 0) {
        console.warn('⚠️ Duplicate IDs detected:', duplicateIds);
      }

      // Check for proper title length
      const title = document.title;
      if (title.length < 30 || title.length > 60) {
        console.warn('⚠️ Title length should be between 30-60 characters:', title.length);
      }

      // Check for proper description length
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
      if (description && (description.length < 120 || description.length > 160)) {
        console.warn('⚠️ Description length should be between 120-160 characters:', description.length);
      }

      // Check for proper canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      if (!canonical) {
        console.warn('⚠️ Missing canonical URL');
      }
    }
  }, []);

  // Run validation tests
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Wait for page to fully load
      const timer = setTimeout(() => {
        console.group('🔍 Quality Assurance Report');
        validateHTMLStructure();
        validateAccessibility();
        validatePerformance();
        validateSEO();
        console.groupEnd();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [validateHTMLStructure, validateAccessibility, validatePerformance, validateSEO]);

  return null;
}
