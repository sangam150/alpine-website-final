import React from 'react'
import { Analytics } from '@vercel/analytics/react'

// Global type declarations
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

// Enhanced analytics configuration
export const analyticsConfig = {
  // Google Analytics 4 Configuration
  ga4: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    debugMode: process.env.NODE_ENV === 'development',
  },
  
  // Custom event tracking
  events: {
    // User engagement events
    pageView: (url: string, title: string) => ({
      event: 'page_view',
      page_location: url,
      page_title: title,
    }),
    
    // Quiz completion events
    quizStarted: (quizType: string) => ({
      event: 'quiz_started',
      quiz_type: quizType,
    }),
    
    quizCompleted: (quizType: string, score: number, result: string) => ({
      event: 'quiz_completed',
      quiz_type: quizType,
      score: score,
      result: result,
    }),
    
    // Application events
    applicationStarted: (country: string, course: string) => ({
      event: 'application_started',
      country: country,
      course: course,
    }),
    
    applicationCompleted: (country: string, course: string, status: string) => ({
      event: 'application_completed',
      country: country,
      course: course,
      status: status,
    }),
    
    // Contact form events
    contactFormSubmitted: (source: string) => ({
      event: 'contact_form_submitted',
      source: source,
    }),
    
    // CTA click events
    ctaClicked: (ctaType: string, location: string) => ({
      event: 'cta_clicked',
      cta_type: ctaType,
      location: location,
    }),
    
    // Document upload events
    documentUploaded: (documentType: string, status: string) => ({
      event: 'document_uploaded',
      document_type: documentType,
      status: status,
    }),
    
    // AI feature usage
    aiFeatureUsed: (feature: string, success: boolean) => ({
      event: 'ai_feature_used',
      feature: feature,
      success: success,
    }),
  },
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && analyticsConfig.ga4.measurementId !== 'G-XXXXXXXXXX') {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.ga4.measurementId}`
    document.head.appendChild(script)
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', analyticsConfig.ga4.measurementId, {
      debug_mode: analyticsConfig.ga4.debugMode,
      send_page_view: true,
    })
    
    // Make gtag globally available
    window.gtag = gtag
  }
}

// Track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  trackEvent('page_view', analyticsConfig.events.pageView(url, title))
}

// Track quiz events
export const trackQuizEvent = (action: 'started' | 'completed', quizType: string, data?: any) => {
  if (action === 'started') {
    trackEvent('quiz_started', analyticsConfig.events.quizStarted(quizType))
  } else if (action === 'completed') {
    trackEvent('quiz_completed', {
      ...analyticsConfig.events.quizCompleted(quizType, data?.score || 0, data?.result || ''),
      ...data,
    })
  }
}

// Track application events
export const trackApplicationEvent = (action: 'started' | 'completed', data: any) => {
  if (action === 'started') {
    trackEvent('application_started', analyticsConfig.events.applicationStarted(data.country, data.course))
  } else if (action === 'completed') {
    trackEvent('application_completed', analyticsConfig.events.applicationCompleted(data.country, data.course, data.status))
  }
}

// Track CTA clicks
export const trackCTAClick = (ctaType: string, location: string) => {
  trackEvent('cta_clicked', analyticsConfig.events.ctaClicked(ctaType, location))
}

// Track AI feature usage
export const trackAIFeature = (feature: string, success: boolean) => {
  trackEvent('ai_feature_used', analyticsConfig.events.aiFeatureUsed(feature, success))
}

// Enhanced Analytics component
export const EnhancedAnalytics: React.FC = () => {
  return React.createElement(Analytics)
} 