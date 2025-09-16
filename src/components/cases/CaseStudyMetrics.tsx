import { motion } from 'framer-motion'
import React from 'react'
import { CaseStudy } from '@/lib/types'

interface CaseStudyMetricsProps {
  metrics: CaseStudy['metrics']
}

export const CaseStudyMetrics: React.FC<CaseStudyMetricsProps> = ({ metrics }) => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const fadeInUpDelayedVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  }

  return (
    <>
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {metrics.map((metric, index) => (
          <div key={index} className="glow-card p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>
            <p className="text-2xl font-bold text-accent-cta">{metric.value}</p>
            {metric.description && (
              <p className="text-sm text-gray-400 mt-2">{metric.description}</p>
            )}
          </div>
        ))}
      </motion.div>


    </>
  )
}
