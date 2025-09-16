'use client'

import { useEffect, useRef } from 'react'

interface HoverSoundProps {
  children: React.ReactNode
  soundUrl?: string
  volume?: number
}

export function HoverSound({
  children,
  soundUrl = '/sounds/hover.mp3',
  volume = 0.2
}: HoverSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(soundUrl)
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [soundUrl, volume])

  const handleMouseEnter = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }
  }

  return (
    <div onMouseEnter={handleMouseEnter}>
      {children}
    </div>
  )
}
