import { Metadata } from 'next'

export function generatePageMetadata({
  title,
  description,
  path,
  type = 'website'
}: {
  title: string
  description: string
  path: string
  type?: string
}): Metadata {
  const baseUrl = 'https://tushar-portfolio.com'
  const url = `${baseUrl}${path}`

  return {
    title: `${title} | Tushar - Cybersecurity Expert & AI Innovator`,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Tushar Portfolio',
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
