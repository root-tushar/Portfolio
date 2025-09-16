'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12 border-4 border-accent-emerald border-t-transparent rounded-full"
      />
    </motion.div>
  )
}

export function withLoadingState<T extends object>(Component: React.ComponentType<T>) {
  return function WithLoadingState(props: T) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Component {...props} />
      </Suspense>
    )
  }
}
