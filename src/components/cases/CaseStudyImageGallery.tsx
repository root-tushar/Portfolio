import { motion } from 'framer-motion'
import React from 'react'

interface ImageGalleryProps {
  images: {
    url: string
    alt: string
    caption?: string
  }[]
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const imageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

export const CaseStudyImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={imageVariants}
          className="relative"
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          {image.caption && (
            <p className="text-sm text-gray-400 mt-2">
              {image.caption}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}
