'use client'

import { Nav } from '@/components/Nav'

import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

const BlogPostClient = dynamic(() => import('./BlogPostClient').then(mod => mod.BlogPostClient), { ssr: false });

export default function BlogPostPage({ params }: PageProps) {
  if (!params?.slug) {
    notFound();
  }
  const post = blogPosts.find(p => p.id === params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPostClient post={post} />;
}

