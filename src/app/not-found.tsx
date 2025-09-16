'use client'

import { motion } from 'framer-motion'
import { Terminal, Lock, Home, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="relative">
              <Terminal className="w-32 h-32 text-accent-red mx-auto mb-4" />
              <Lock className="w-16 h-16 text-accent-emerald absolute -top-4 -right-4" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl sm:text-7xl font-bold mb-6"
          >
            <span className="text-gradient">404</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Access Denied
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-xl text-text-secondary mb-8 max-w-lg mx-auto"
          >
            The page you're looking for has been compromised or doesn't exist. 
            Our security systems have blocked this unauthorized access attempt.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Return to Base
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-secondary text-lg px-8 py-4 inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Previous Page
            </button>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg max-w-md mx-auto"
          >
            <p className="text-sm text-accent-red font-mono">
              💡 Pro tip: Check your URL for typos or try navigating from the main menu
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
