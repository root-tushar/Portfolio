'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MouseEvent, useState } from 'react'

interface NeonButtonProps {
  children: React.ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  glowColor?: string
}

export function NeonButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'md',
  glowColor = '#2ECC71'
}: NeonButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: `bg-accent-emerald/10 text-accent-emerald border border-accent-emerald hover:bg-accent-emerald/20`,
    secondary: `bg-accent-blue/10 text-accent-blue border border-accent-blue hover:bg-accent-blue/20`,
    outline: `bg-transparent border border-accent-emerald text-accent-emerald hover:bg-accent-emerald/10`
  }

  const playHoverSound = () => {
    const audio = new Audio('/sounds/hover.mp3')
    audio.volume = 0.2
    audio.play()
  }

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
        playHoverSound()
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group font-mono rounded-md transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-md"
        animate={{
          boxShadow: isHovered
            ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}40`
            : '0 0 0px transparent'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </div>
    </motion.button>
  )
}
