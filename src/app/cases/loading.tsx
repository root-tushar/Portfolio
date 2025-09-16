'use client'

import { motion } from 'framer-motion'

export default function CasesLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl text-text-secondary"
      >
        Loading case study...
      </motion.div>
    </div>
  )
}
