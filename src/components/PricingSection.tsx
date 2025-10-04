'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { pricingTiers } from '@/lib/data'
import { Check, Crown } from 'lucide-react'

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section ref={ref} className="section-padding bg-background-secondary/30">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Simple <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose the plan that fits your security needs. All plans include a free 30-minute consultation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              variants={itemVariants}
              className={`glow-card relative ${
                tier.isPopular 
                  ? 'ring-2 ring-accent-cta scale-105' 
                  : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-accent-cta text-background px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Crown className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold text-accent-cta mb-2">
                  {tier.price}
                </div>
                <p className="text-text-secondary">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-accent-emerald mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <button className="w-full btn-primary">
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <a href="https://calendly.com/goyal-tushar1974/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Schedule a Call
          </a>
        </motion.div>
      </div>
    </section>
  )
}
