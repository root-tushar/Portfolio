import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { blogPosts } from '@/lib/data'
import BlogPostClient from './BlogPostClient'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  if (!params?.slug) {
    notFound();
  }
  const post = blogPosts.find(p => p.id === params.slug);
  if (!post) {
    notFound();
  }
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <BlogPostClient post={post} />
      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  // Import here to avoid issues with static analysis
  const { blogPosts } = require('@/lib/data');
  return blogPosts.map((post: { id: string }) => ({ slug: post.id }));
}
