import { Metadata } from 'next'

// Define allowed Open Graph types (matching Next.js Metadata spec)
type OpenGraphType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'

interface MetadataProps {
  title: string
  description: string
  path: string
  type?: OpenGraphType
}

export function generatePageMetadata({
  title,
  description,
  path,
  type = 'website',
}: MetadataProps): Metadata {
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
