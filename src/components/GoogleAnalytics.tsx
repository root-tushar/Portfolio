'use client'

import { useEffect } from 'react'

const GA_TRACKING_ID = 'G-EBYEPZMW8G'

export function GoogleAnalytics() {
  useEffect(() => {
    // Ensure gtag is available
    if (typeof window !== 'undefined' && window.gtag) {
      // Track initial page view
      window.gtag('config', GA_TRACKING_ID, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [])

  return null
}

// Helper function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Helper function to track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}