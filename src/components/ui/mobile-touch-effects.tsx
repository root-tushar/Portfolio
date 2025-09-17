'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TouchRipple {
  id: number
  x: number
  y: number
}

export function MobileTouchEffects() {
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleTouchStart = (e: TouchEvent) => {
      if (!isMobile) return
      
      const touch = e.touches[0]
      if (touch) {
        const newRipple: TouchRipple = {
          id: Date.now() + Math.random(),
          x: touch.clientX,
          y: touch.clientY
        }
        
        setTouchRipples(prev => [...(prev || []), newRipple])
        
        // Remove ripple after animation
        setTimeout(() => {
          setTouchRipples(prev => prev?.filter(ripple => ripple.id !== newRipple.id) || [])
        }, 1000)
      }
    }

    if (isMobile) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      if (isMobile) {
        document.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [isMobile])

  // Don't render on desktop
  if (!isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {touchRipples?.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-accent-emerald"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.8,
            }}
            animate={{
              width: 50,
              height: 50,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Mobile-specific particle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-emerald rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}