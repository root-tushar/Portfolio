"use client";
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostClient({ post }: { post: any }) {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              {post.excerpt}
            </p>
            {/* Meta */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4" />
                  <span>{post.tags.join(', ')}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glow-card p-8"
            >
              <div className="prose prose-invert max-w-none">
                <div>{post.content}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
