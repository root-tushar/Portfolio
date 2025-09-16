'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { blogPosts } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User, Clock, Tag } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-6"
          >
            Security <span className="text-gradient">Insights</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
          >
            Stay updated with the latest cybersecurity trends, AI developments, and practical security tips. Knowledge is your first line of defense.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-text line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300 text-sm"
                >
                  Read More <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glow-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Never Miss a Security Update
              </h3>
              <p className="text-text-secondary mb-6">
                Get the latest cybersecurity insights, AI developments, and security tips delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-3">
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
