'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { caseStudies } from '@/lib/data'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'

export default function CasesPage() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              Real-world projects and their impact
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-6"
              >
                <h3 className="text-xl font-bold mb-3">{caseStudy.title}</h3>
                <p className="text-text-secondary mb-4">{caseStudy.excerpt}</p>
                
                <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{caseStudy.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(caseStudy.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent-red/20 text-accent-red rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/cases/${caseStudy.id}`}
                  className="btn-primary inline-block"
                >
                  Read Case Study
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}