import { blogPosts } from '@/lib/data';
import dynamic from 'next/dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }))
}

const BlogPostClient = dynamic(() => import('./BlogPostClient').then(mod => mod.BlogPostClient), { ssr: false });

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find(p => p.id === params.slug);
  
  return <BlogPostClient post={post} />;
}

