import { Metadata } from 'next'
import { blogPosts } from '@/lib/data'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find(p => p.id === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | Tushar - Cybersecurity Expert & AI Innovator',
      description: 'The requested blog post could not be found.',
    }
  }

  return {
    title: `${post.title} | Tushar's Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      authors: ['Tushar'],
    },
  }
}
