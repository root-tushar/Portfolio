'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode
} from 'react'
import { SoundEffect } from '@/types/interactive'

interface InteractiveContextType {
  isTerminalOpen: boolean
  isChatbotOpen: boolean
  openTerminal: () => void
  closeTerminal: () => void
  openChatbot: () => void
  closeChatbot: () => void
  soundEnabled: boolean
  toggleSound: () => void
  playSoundEffect: (type: SoundEffect) => void
  matrixMode: boolean
  toggleMatrixMode: () => void
}

const InteractiveContext = createContext<InteractiveContextType | undefined>(undefined)

interface InteractiveProviderProps {
  children: ReactNode
}

export function InteractiveProvider({ children }: InteractiveProviderProps) {
  // Load settings from localStorage
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sound_enabled')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })
  const [matrixMode, setMatrixMode] = useState(false)
  const [audioCache, setAudioCache] = useState<Record<string, HTMLAudioElement>>({})

  // Initialize audio cache
  useEffect(() => {
    try {
      const sounds = {
        hover: '/sounds/hover.mp3',
        click: '/sounds/click.mp3',
        error: '/sounds/error.mp3',
        success: '/sounds/success.mp3',
        typing: '/sounds/typing.mp3',
        send: '/sounds/send.mp3',
        notification: '/sounds/notification.mp3',
        on: '/sounds/on.mp3',
        off: '/sounds/click.mp3', // Using click.mp3 for off sound
        close: '/sounds/error.mp3' // Using error.mp3 for close sound
      }

      const newAudioCache: Record<string, HTMLAudioElement> = {}
      
      Object.entries(sounds).forEach(([key, path]) => {
        const audio = new Audio(path)
        audio.volume = key === 'typing' ? 0.05 : 0.2 // Lower volume for typing sounds
        audio.preload = 'auto'
        newAudioCache[key] = audio
      })

      setAudioCache(newAudioCache)

      return () => {
        Object.values(newAudioCache).forEach(audio => {
          audio.pause()
          audio.currentTime = 0
        })
      }
    } catch (error) {
      console.error('Error initializing audio:', error)
    }
  }, [])

  const playSoundEffect = useCallback((type: 'hover' | 'click' | 'error' | 'success' | 'typing' | 'send' | 'notification' | 'on' | 'off' | 'close') => {
    if (soundEnabled && audioCache[type]) {
      try {
        const audio = audioCache[type];
        audio.currentTime = 0;
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Audio play error:", error);
          });
        }
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
  }, [soundEnabled, audioCache])

  const openTerminal = useCallback(() => {
    setIsTerminalOpen(true)
    playSoundEffect('click')
  }, [playSoundEffect])

  const closeTerminal = useCallback(() => {
    setIsTerminalOpen(false)
    playSoundEffect('click')
  }, [playSoundEffect])

  const openChatbot = useCallback(() => {
    setIsChatbotOpen(true)
    playSoundEffect('click')
  }, [playSoundEffect])

  const closeChatbot = useCallback(() => {
    setIsChatbotOpen(false)
    playSoundEffect('click')
  }, [playSoundEffect])

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev
      if (typeof window !== 'undefined') {
        localStorage.setItem('sound_enabled', String(newValue))
      }
      playSoundEffect('click')
      return newValue
    })
  }, [playSoundEffect])

  const toggleMatrixMode = useCallback(() => {
    setMatrixMode(prev => !prev)
    playSoundEffect('success')
  }, [playSoundEffect])

  const value = {
    isTerminalOpen,
    isChatbotOpen,
    openTerminal,
    closeTerminal,
    openChatbot,
    closeChatbot,
    soundEnabled,
    toggleSound,
    playSoundEffect,
    matrixMode,
    toggleMatrixMode
  }

  // Expose context to window for Terminal and Chatbot components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const context: InteractiveContext = {
        isTerminalOpen,
        isChatbotOpen,
        openTerminal,
        closeTerminal,
        openChatbot,
        closeChatbot,
        soundEnabled,
        toggleSound,
        playSoundEffect,
        matrixMode,
        toggleMatrixMode
      }
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        delete window.interactiveContext
      }
    }
  }, [
    isTerminalOpen,
    isChatbotOpen,
    openTerminal,
    closeTerminal,
    openChatbot,
    closeChatbot,
    soundEnabled,
    toggleSound,
    playSoundEffect,
    matrixMode,
    toggleMatrixMode
  ])

  return (
    <InteractiveContext.Provider value={value}>
      {children}
    </InteractiveContext.Provider>
  )
}

export const useInteractive = () => {
  const context = useContext(InteractiveContext)
  if (context === undefined) {
    throw new Error('useInteractive must be used within an InteractiveProvider')
  }
  return context
}
