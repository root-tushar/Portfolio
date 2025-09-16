import { motion } from 'framer-motion'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface CaseStudyHeroProps {
  title: string
  excerpt: string
  author: string
  date: string
  avatar?: string
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const CaseStudyHero: React.FC<CaseStudyHeroProps> = ({
  title,
  excerpt,
  author,
  date,
  avatar
}) => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto text-center"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
        {title}
      </h1>
      <p className="text-xl text-text-secondary mb-8">
        {excerpt}
      </p>
      
      <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          {avatar ? (
            <Image
              src={avatar}
              alt={author}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span>{author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  )
}
