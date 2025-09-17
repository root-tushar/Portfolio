'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  glowSize: number
  glowOpacity: number
}

interface ParticleBGProps {
  density?: number
  speed?: number
  colors?: string[]
  interactive?: boolean
}

export default function ParticleBG({ 
  density = 100,
  speed = 1,
  colors = ['#2ECC71', '#E53935', '#1976D2'],
  interactive = true
}: ParticleBGProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Enable alpha blending
    ctx.globalCompositeOperation = 'lighter'

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    // Handle touch movement for mobile
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      if (touch) {
        setMousePos({
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        })
      }
    }

    if (interactive) {
      if (isMobile) {
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
        canvas.addEventListener('touchstart', handleTouchMove, { passive: false })
      } else {
        window.addEventListener('mousemove', handleMouseMove)
      }
    }

    // Particle system
    const particles: Particle[] = []
    const particleCount = density

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color,
        glowSize: Math.random() * 10 + 5,
        glowOpacity: Math.random() * 0.3 + 0.1
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Interactive behavior
        if (interactive) {
          const dx = mousePos.x - particle.x
          const dy = mousePos.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx)
            const force = (100 - distance) / 100
            particle.vx += Math.cos(angle) * force * 0.2
            particle.vy += Math.sin(angle) * force * 0.2
          }
        }

        // Add some chaos
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1

        // Limit velocity
        const maxSpeed = 2 * speed
        const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (currentSpeed > maxSpeed) {
          particle.vx = (particle.vx / currentSpeed) * maxSpeed
          particle.vy = (particle.vy / currentSpeed) * maxSpeed
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.glowSize
        )
        gradient.addColorStop(0, `${particle.color}`)
        gradient.addColorStop(1, `${particle.color}00`)
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
            gradient.addColorStop(1, `${otherParticle.color}${Math.floor(otherParticle.opacity * 255).toString(16).padStart(2, '0')}`)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (interactive) {
        if (isMobile) {
          canvas.removeEventListener('touchmove', handleTouchMove)
          canvas.removeEventListener('touchstart', handleTouchMove)
        } else {
          window.removeEventListener('mousemove', handleMouseMove)
        }
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [density, speed, colors, interactive, mousePos])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 1 }}
      style={{ zIndex: 1 }}
    />
  )
}
