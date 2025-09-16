'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { blogPosts } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: PageProps) {
  if (!params?.slug) {
    notFound()
  }

  const post = blogPosts.find(p => p.id === params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Blog Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glow-card p-8 mb-8"
            >
              <div className="prose prose-invert max-w-none">
                <h2>Introduction</h2>
                <p>
                  In today's rapidly evolving digital landscape, staying ahead of cybersecurity threats 
                  requires not just vigilance, but intelligent, adaptive solutions. This article explores 
                  the cutting-edge developments that are reshaping how we approach digital security.
                </p>

                <h2>The Current State of Cybersecurity</h2>
                <p>
                  Traditional security measures are no longer sufficient in the face of increasingly 
                  sophisticated attacks. Organizations need to adopt a more proactive, intelligence-driven 
                  approach to protect their digital assets.
                </p>

                <h2>Emerging Technologies and Their Impact</h2>
                <p>
                  Several key technologies are revolutionizing cybersecurity:
                </p>
                <ul>
                  <li><strong>Artificial Intelligence:</strong> Machine learning algorithms can detect 
                  patterns and anomalies that human analysts might miss.</li>
                  <li><strong>Automation:</strong> Automated response systems can react to threats in 
                  milliseconds, far faster than human operators.</li>
                  <li><strong>Behavioral Analysis:</strong> Advanced analytics can identify suspicious 
                  behavior patterns before they result in security breaches.</li>
                </ul>

                <h2>Practical Implementation Strategies</h2>
                <p>
                  Implementing these technologies requires careful planning and a phased approach. 
                  Start with pilot programs in non-critical areas, then gradually expand as you 
                  gain confidence and experience.
                </p>

                <h2>Looking Ahead</h2>
                <p>
                  The future of cybersecurity lies in the integration of human expertise with 
                  intelligent automation. By combining the best of both worlds, organizations 
                  can create security systems that are both effective and efficient.
                </p>

                <h2>Conclusion</h2>
                <p>
                  As we move forward, the key to success will be staying informed about emerging 
                  threats and technologies, while maintaining a practical, risk-based approach to 
                  security implementation.
                </p>
              </div>
            </motion.div>

            {/* Share and Related */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glow-card p-6 mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Share This Article</h3>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-accent-red hover:text-accent-cta transition-colors duration-300">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glow-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts
                  .filter(p => p.id !== post.id)
                  .slice(0, 2)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.id}`}
                      className="block p-4 bg-background-secondary/30 rounded-lg hover:bg-background-secondary/50 transition-colors duration-300"
                    >
                      <h4 className="font-semibold mb-2 text-text">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-text-secondary mb-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="text-xs text-text-secondary">
                    {new Date(relatedPost.publishedAt).toLocaleDateString()} • {relatedPost.readingTime}
                  </div>
                    </Link>
                  ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with Security Insights
              </h3>
              <p className="text-text-secondary mb-6">
                Get the latest cybersecurity trends and practical tips delivered to your inbox.
              </p>
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Subscribe to Newsletter
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
