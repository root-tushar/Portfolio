'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import { ReactNode } from 'react'

interface CyberCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  animate?: boolean
}

export function CyberCard({
  children,
  className,
  glowColor = '#2ECC71',
  animate = true
}: CyberCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-lg bg-background-secondary/30 backdrop-blur-sm',
        'border border-accent-emerald/20 hover:border-accent-emerald/40',
        'transition-all duration-300 group',
        className
      )}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-[1px] h-8 bg-accent-emerald" />
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-accent-emerald" />
      <div className="absolute top-0 right-0 w-[1px] h-8 bg-accent-emerald" />
      <div className="absolute top-0 right-0 w-8 h-[1px] bg-accent-emerald" />
      <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-accent-emerald" />
      <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-accent-emerald" />
      <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-accent-emerald" />
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-accent-emerald" />

      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{
             boxShadow: `inset 0 0 20px ${glowColor}20, 0 0 40px ${glowColor}10`
           }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
