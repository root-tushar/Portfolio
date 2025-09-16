'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { services } from '@/lib/data'
import { cn } from '@/lib/utils'

const iconMap: Record<string, string> = {
  'robot': '🤖',
  'cogs': '⚙️',
  'chart-line': '📈',
  'comments': '💬',
  'shield-alt': '🛡️',
  'search': '🔍',
  'laptop-code': '💻',
  'bug': '🐛',
  'linux': '🐧',
  'network-wired': '🌐'
}

export function ServicesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            What <span className="text-gradient">I Do</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            As a cybersecurity enthusiast, I combine practical skills with real-world tools to explore, learn, and secure digital systems. My focus is on understanding vulnerabilities, implementing security measures, and staying current with emerging threats.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Array.isArray(services) && services.length > 0 ? services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={cn(
                "glow-card group cursor-pointer transform transition-all duration-300",
                "hover:scale-105 hover:shadow-xl hover:shadow-accent-red/20"
              )}
            >
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                {iconMap[service.icon] || '🔧'}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-accent-red transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-text-secondary text-center leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 pt-4 border-t border-accent-red/20">
                <ul className="space-y-2">
                  {service.features?.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-sm text-text-secondary flex items-center">
                      <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center text-text-secondary">
              {!services ? 'Loading services...' : 'No services available at the moment.'}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/services"
            className="btn-primary text-lg px-8 py-4"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  )
}
