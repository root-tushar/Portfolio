'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TouchRipple {
  id: number
  x: number
  y: number
}

export function MobileTouchEffects() {
  const [touchRipples, setTouchRipples] = useState<TouchRipple[]>([])
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
        
        setTouchRipples(prev => [...prev, newRipple])
        
        // Remove ripple after animation - shorter duration
        setTimeout(() => {
          setTouchRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
        }, 600)
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
        {touchRipples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border border-accent-emerald/60"
            style={{
              left: ripple.x - 15,
              top: ripple.y - 15,
            }}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.6,
            }}
            animate={{
              width: 30,
              height: 30,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}