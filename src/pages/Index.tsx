import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { useAnalytics } from "@/hooks/use-analytics";
import { ResourceOptimizer } from "@/components/ResourceOptimizer";
import { OfflineHandler } from "@/components/OfflineHandler";


const Index = () => {
  
  // Register service worker
  useServiceWorker();
  
  // Analytics tracking
  const analytics = useAnalytics();
  
  return (
    <>
      <SEOHead />
      <StructuredData />
      <AccessibilityEnhancer />
      <ResourceOptimizer />
      <OfflineHandler />
          <SmoothScroll>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  );
};

export default Index;
