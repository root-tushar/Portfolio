'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300 mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Your privacy and data security are our top priorities. Learn how we protect your information.
            </p>
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
                <h2>Information We Collect</h2>
                <p>
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul>
                  <li>Contact us through our website forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request a consultation</li>
                  <li>Download resources</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you relevant cybersecurity insights and updates</li>
                  <li>Respond to your inquiries and requests</li>
                </ul>

                <h2>Information Sharing</h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties 
                  without your consent, except as described in this policy or as required by law.
                </p>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2>Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our data practices, 
                  please contact us through our contact form.
                </p>

                <p className="text-sm text-text-secondary mt-8">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
