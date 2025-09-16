'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data'
import { Github, ExternalLink, FileText } from 'lucide-react'

export function ProjectsPreview() {
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
    <section ref={ref} className="section-padding bg-background">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Here are some of my hands-on cybersecurity projects and lab work that demonstrate my practical skills and learning journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="glow-card group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                {project.category === 'cybersecurity' ? '🛡️' : '🤖'}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center group-hover:text-accent-red transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-accent-blue text-sm font-mono text-center mb-3">
                {project.technologies.join(' • ')}
              </p>
              <p className="text-text-secondary text-center leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex justify-center space-x-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-red transition-colors duration-300"
                  >
                    <Github className="h-5 w-5" />
                    <span>View Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-red transition-colors duration-300"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Live Demo</span>
                  </a>
                )}
                {!project.liveUrl && (
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-text-secondary hover:text-accent-red transition-colors duration-300"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Documentation</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="/cases"
            className="btn-secondary text-lg px-8 py-4"
          >
            View All Case Studies
          </a>
        </motion.div>
      </div>
    </section>
  )
}
