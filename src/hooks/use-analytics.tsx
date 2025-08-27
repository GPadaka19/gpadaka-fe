import { useEffect, useCallback } from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export function useAnalytics() {
  // Track page views
  const trackPageView = useCallback((page: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-925X98LEYK', {
        page_path: page
      });
    }
  }, []);

  // Track custom events
  const trackEvent = useCallback(({ action, category, label, value }: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }, []);

  // Track section visibility
  const trackSectionVisibility = useCallback((sectionName: string) => {
    trackEvent({
      action: 'section_view',
      category: 'engagement',
      label: sectionName
    });
  }, [trackEvent]);

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth
    });
  }, [trackEvent]);

  // Track time on page
  const trackTimeOnPage = useCallback((timeInSeconds: number) => {
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: 'total_time',
      value: timeInSeconds
    });
  }, [trackEvent]);

  // Track form interactions
  const trackFormInteraction = useCallback((formName: string, action: string) => {
    trackEvent({
      action: `form_${action}`,
      category: 'form_interaction',
      label: formName
    });
  }, [trackEvent]);

  // Track button clicks
  const trackButtonClick = useCallback((buttonName: string, location: string) => {
    trackEvent({
      action: 'button_click',
      category: 'interaction',
      label: `${buttonName}_${location}`
    });
  }, [trackEvent]);

  // Track external link clicks
  const trackExternalLink = useCallback((url: string, linkText: string) => {
    trackEvent({
      action: 'external_link_click',
      category: 'navigation',
      label: `${linkText}_${url}`
    });
  }, [trackEvent]);

  // Track performance metrics
  const trackPerformance = useCallback((metric: string, value: number) => {
    trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value)
    });
  }, [trackEvent]);

  // Track errors
  const trackError = useCallback((error: string, location: string) => {
    trackEvent({
      action: 'error',
      category: 'error_tracking',
      label: `${error}_${location}`
    });
  }, [trackEvent]);

  // Track user preferences
  const trackUserPreference = useCallback((preference: string, value: string) => {
    trackEvent({
      action: 'user_preference',
      category: 'user_behavior',
      label: `${preference}_${value}`
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackSectionVisibility,
    trackScrollDepth,
    trackTimeOnPage,
    trackFormInteraction,
    trackButtonClick,
    trackExternalLink,
    trackPerformance,
    trackError,
    trackUserPreference
  };
}
