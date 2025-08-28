import { useEffect } from 'react';

export function StructuredData() {
  useEffect(() => {
    // Create structured data for the portfolio website
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Gusti Padaka",
      "jobTitle": "Informatics Student & Full-Stack Developer",
      "description": "Informatics student specializing in web development, AI/ML, and modern software solutions",
      "url": "https://gpadaka.com",
      "sameAs": [
        "https://github.com/gpadaka",
        "https://linkedin.com/in/gpadaka"
      ],
      "knowsAbout": [
        "Web Development",
        "Full-Stack Development",
        "React",
        "TypeScript",
        "AI/ML",
        "Software Engineering"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Informatics Program"
      },
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Developer"
      }
    };

    // Remove existing structured data if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
