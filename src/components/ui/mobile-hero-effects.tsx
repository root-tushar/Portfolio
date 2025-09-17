'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function MobileHeroEffects() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  if (!isMobile) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Simplified floating orbs - only 3 instead of 8 */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-accent-emerald/20 blur-sm"
          style={{
            width: 40,
            height: 40,
            left: `${20 + i * 30}%`,
            top: `${20 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Single pulsing ring */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute border border-accent-emerald/20 rounded-full"
          style={{
            width: 200,
            height: 200,
            left: -100,
            top: -100,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </div>
  )
}