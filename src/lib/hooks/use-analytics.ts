'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type PageView = {
  path: string
  timestamp: number
  referrer: string
}

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Record page view
    const pageView: PageView = {
      path: pathname,
      timestamp: Date.now(),
      referrer: document.referrer,
    }

    // Store in localStorage with expiration (30 days)
    const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]')
    pageViews.push(pageView)

    // Keep only last 100 page views
    if (pageViews.length > 100) {
      pageViews.shift()
    }

    localStorage.setItem('pageViews', JSON.stringify(pageViews))

    // Clean up old views (older than 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
    const recentViews = pageViews.filter((view: PageView) => view.timestamp > thirtyDaysAgo)
    localStorage.setItem('pageViews', JSON.stringify(recentViews))
  }, [pathname, searchParams])
}
