'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Download, CheckCircle } from 'lucide-react'

export function LeadMagnetSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Here you would typically send to your API
    console.log('Email captured:', email)
    setIsSubmitted(true)
    setEmail('')
  }

  return (
    <section ref={ref} className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get Your Free <span className="text-gradient">Security Checklist</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Download our comprehensive "AI + Security Checklist" and discover the 23 critical steps every business should take to protect their digital assets and leverage AI safely.
          </p>

          <div className="bg-background-secondary/50 backdrop-blur-sm border border-accent-red/20 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <Download className="w-16 h-16 text-accent-cta mr-4" />
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">What's Inside:</h3>
                <ul className="text-text-secondary space-y-2">
                  <li>• 23-step security audit checklist</li>
                  <li>• AI implementation safety guidelines</li>
                  <li>• Incident response templates</li>
                  <li>• Security tool recommendations</li>
                </ul>
              </div>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary whitespace-nowrap"
                  >
                    Get Free Checklist
                  </button>
                </div>
                <p className="text-xs text-text-secondary mt-3">
                  No spam, ever. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <CheckCircle className="w-16 h-16 text-accent-emerald mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
                <p className="text-text-secondary">
                  Your security checklist is on its way. Check your inbox (and spam folder) for the download link.
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>Instant Download</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>PDF Format</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>No Registration Required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
