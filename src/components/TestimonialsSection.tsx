'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { testimonials } from '@/lib/data'
import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
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
    <section ref={ref} className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            What <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Don't just take my word for it. Here's what professionals have to say about working with me.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="glow-card relative"
            >
              <Quote className="absolute -top-4 left-6 w-8 h-8 text-accent-red/30" />
              
              <div className="mb-4">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-cta text-accent-cta" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>

              <blockquote className="text-text-secondary leading-relaxed mb-4">
                "{testimonial.content}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-accent-red rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-text">{testimonial.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
