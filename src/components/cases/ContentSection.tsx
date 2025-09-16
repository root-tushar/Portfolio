import { motion } from 'framer-motion'
import React from 'react'

interface ContentSectionProps {
  title: string
  content: string
}

export const ContentSection: React.FC<ContentSectionProps> = ({ title, content }) => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="prose prose-invert max-w-none">
        {content.split('\n').map((paragraph, i) => {
          if (paragraph.startsWith('## ')) {
            return <h3 key={i} className="text-2xl font-semibold mt-8 mb-4">{paragraph.replace('## ', '')}</h3>
          }
          if (paragraph.startsWith('- ')) {
            return <li key={i} className="ml-6">{paragraph.replace('- ', '')}</li>
          }
          if (paragraph.startsWith('1. ')) {
            return <div key={i} className="flex gap-2"><span className="text-accent-cta">{paragraph.split('.')[0]}.</span>{paragraph.split('. ')[1]}</div>
          }
          if (paragraph.trim() !== '') {
            return <p key={i} className="mb-4">{paragraph}</p>
          }
          return null
        })}
      </div>
    </motion.div>
  )
}
