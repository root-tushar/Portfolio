'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { platformStats } from '@/lib/data'
import { Trophy, Clock, Target } from 'lucide-react'

export function ExperienceSection() {
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
            My <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto">
            While I may not have formal industry experience yet, I've spent countless hours mastering real-world cybersecurity tools, completing labs on platforms like TryHackMe, and solving real security problems—ready to bring that same dedication to your project.
          </p>
        </motion.div>

        {/* Platform Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {/* TryHackMe */}
          <motion.div variants={itemVariants} className="glow-card text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={platformStats.tryHackMe.logo} 
                alt="TryHackMe" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">TryHackMe</h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-emerald">
                {platformStats.tryHackMe.rank}
              </div>
              <div className="text-text-secondary">
                {platformStats.tryHackMe.rooms} Rooms
              </div>
            </div>
          </motion.div>

          {/* HackTheBox */}
          <motion.div variants={itemVariants} className="glow-card text-center">
            <div className="flex justify-center mb-4">
              <img 
                src={platformStats.hackTheBox.logo} 
                alt="HackTheBox" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h3 className="text-2xl font-bold mb-3">Hack The Box</h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-emerald">
                {platformStats.hackTheBox.rank}
              </div>
              <div className="text-text-secondary">
                {platformStats.hackTheBox.machines} Machines
              </div>
            </div>
          </motion.div>

          {/* Personal Lab */}
          <motion.div variants={itemVariants} className="glow-card text-center">
            <div className="flex justify-center mb-4">
              <Clock className="w-16 h-16 text-accent-red" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Personal Lab</h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent-emerald">
                {platformStats.personalLab.hours}
              </div>
              <div className="text-text-secondary">
                {platformStats.personalLab.description}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="glow-card">
            <div className="text-center mb-4">
              <Trophy className="w-12 h-12 text-accent-red mx-auto mb-3" />
              <h3 className="text-xl font-bold">Continuous Learning</h3>
            </div>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Daily practice on cybersecurity platforms
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Active participation in CTF competitions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Regular security research and documentation
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="glow-card">
            <div className="text-center mb-4">
              <Target className="w-12 h-12 text-accent-red mx-auto mb-3" />
              <h3 className="text-xl font-bold">Practical Projects</h3>
            </div>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Built and secured home lab environment
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Developed automation tools for security testing
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Conducted authorized testing on practice platforms
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="glow-card">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-accent-red rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">C</span>
              </div>
              <h3 className="text-xl font-bold">Community Involvement</h3>
            </div>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Active in cybersecurity forums and discussions
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Share knowledge through blog posts and write-ups
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-accent-emerald rounded-full mr-2 mt-2 flex-shrink-0" />
                Collaborate with other security enthusiasts
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
