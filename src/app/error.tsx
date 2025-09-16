'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-text-secondary mb-8">{error.message}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-accent-emerald text-white rounded hover:bg-accent-emerald/80"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-background-secondary text-text rounded hover:bg-background-secondary/80"
          >
            Go home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
