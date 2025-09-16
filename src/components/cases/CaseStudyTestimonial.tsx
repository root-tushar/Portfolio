import { motion } from 'framer-motion'
import React from 'react'

interface TestimonialProps {
  quote: string
  author: { name: string; avatar?: string }
  role?: string
  company?: string
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay: 0.2 }
  }
}

export const CaseStudyTestimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  company 
}) => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-accent-red/10 to-accent-red/5 rounded-lg p-6 my-8"
    >
      <blockquote className="text-lg font-light italic mb-4">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-2">
        <div>
          <p className="font-medium text-accent-red">{author.name}</p>
          {(role || company) && (
            <p className="text-sm text-gray-400">
              {role}{company && role ? ' at ' : ''}{company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
