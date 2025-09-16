import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add security headers
  const headers = new Headers(request.headers)
  
  // Security headers
  const securityHeaders = {
    'X-DNS-Prefetch-Control': 'on',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'X-XSS-Protection': '1; mode=block',
  }

  // Apply security headers to response
  const response = NextResponse.next()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}
