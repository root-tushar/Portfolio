import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Scale, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-xl text-text-secondary">
              Please read these terms carefully before using our services.
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
                <h2>Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>

                <h2>Services Description</h2>
                <p>
                  We provide cybersecurity consulting, AI solutions, and educational content. Our services 
                  are designed to help businesses improve their security posture and operational efficiency.
                </p>

                <h2>Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials on our website 
                  for personal, non-commercial transitory viewing only.
                </p>

                <h2>Disclaimer</h2>
                <p>
                  The materials on our website are provided on an 'as is' basis. We make no warranties, 
                  expressed or implied, and hereby disclaim and negate all other warranties including 
                  without limitation, implied warranties or conditions of merchantability, fitness for a 
                  particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>

                <h2>Limitations</h2>
                <p>
                  In no event shall we or our suppliers be liable for any damages (including, without 
                  limitation, damages for loss of data or profit, or due to business interruption) arising 
                  out of the use or inability to use the materials on our website.
                </p>

                <h2>Accuracy of Materials</h2>
                <p>
                  The materials appearing on our website could include technical, typographical, or 
                  photographic errors. We do not warrant that any of the materials on our website are 
                  accurate, complete, or current.
                </p>

                <h2>Links</h2>
                <p>
                  We have not reviewed all of the sites linked to our website and are not responsible 
                  for the contents of any such linked site. The inclusion of any link does not imply 
                  endorsement by us of the site.
                </p>

                <h2>Modifications</h2>
                <p>
                  We may revise these terms of service for our website at any time without notice. 
                  By using this website, you are agreeing to be bound by the then current version 
                  of these Terms of Service.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws 
                  and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
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
