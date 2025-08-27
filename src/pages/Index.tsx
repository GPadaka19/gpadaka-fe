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
import { usePerformanceMonitoring } from "@/hooks/use-performance-monitoring";
import { AccessibilityEnhancer } from "@/components/AccessibilityEnhancer";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { useAnalytics } from "@/hooks/use-analytics";
import { ResourceOptimizer } from "@/components/ResourceOptimizer";
import { useWebVitals } from "@/hooks/use-web-vitals";
import { BundleAnalyzer } from "@/components/BundleAnalyzer";
import { OfflineHandler } from "@/components/OfflineHandler";
import { QualityAssurance } from "@/components/QualityAssurance";
import { Internationalization } from "@/components/Internationalization";
import { DevelopmentTools } from "@/components/DevelopmentTools";
import { TestingAndMonitoring } from "@/components/TestingAndMonitoring";

const Index = () => {
  // Monitor performance metrics
  usePerformanceMonitoring();
  
  // Register service worker
  useServiceWorker();
  
  // Analytics tracking
  const analytics = useAnalytics();
  
  // Web vitals monitoring
  useWebVitals();

  return (
    <>
      <SEOHead />
      <StructuredData />
      <AccessibilityEnhancer />
      <ResourceOptimizer />
      <BundleAnalyzer />
      <OfflineHandler />
                <QualityAssurance />
          <Internationalization />
          <DevelopmentTools />
          <TestingAndMonitoring />
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
