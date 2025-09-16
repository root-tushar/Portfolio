import { motion } from 'framer-motion'
import React from 'react'

interface CaseStudyTagsProps {
  tags: string[]
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, delay: 0.1 }
  }
}

export const CaseStudyTags: React.FC<CaseStudyTagsProps> = ({ tags }) => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-accent-red/20 text-accent-red rounded-full text-sm font-medium"
        >
          {tag}
        </span>
      ))}
    </motion.div>
  )
}
