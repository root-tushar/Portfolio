'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Challenge {
  id: string
  title: string
  description: string
  hint: string
  solution: string
  completed: boolean
}

export function HackingGame() {
  const router = useRouter()
  const [currentLevel, setCurrentLevel] = useState(0)
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [gameStarted, setGameStarted] = useState(false)

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Access Control',
      description: 'Find the hidden password in the HTML comments.',
      hint: 'View the page source or inspect element to find a hidden comment.',
      solution: 'cyber_sentinel',
      completed: false
    },
    {
      id: '2',
      title: 'Data Encryption',
      description: 'Decode the base64 string: "YWlfZXhwZXJ0"',
      hint: 'This is a common encoding method used in web applications.',
      solution: 'ai_expert',
      completed: false
    },
    {
      id: '3',
      title: 'SQL Injection',
      description: 'Find the correct input to bypass the login.',
      hint: 'Try using SQL wildcard characters.',
      solution: '%_ OR 1=1',
      completed: false
    }
  ]

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0) {
      setMessage('Time\'s up! Game over.')
      setTimeout(() => {
        router.push('/')
      }, 3000)
    }
  }, [timeLeft, gameStarted, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => {
    setGameStarted(true)
    setMessage('Game started! Good luck, hacker.')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentChallenge = challenges[currentLevel]

    if (input.toLowerCase() === currentChallenge.solution.toLowerCase()) {
      setScore(prev => prev + 100)
      setMessage('Access granted! Moving to next level...')
      setInput('')
      setShowHint(false)

      if (currentLevel === challenges.length - 1) {
        setMessage('Congratulations! You\'ve completed all challenges!')
        // Add completion animation or effect here
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setTimeout(() => {
          setCurrentLevel(prev => prev + 1)
          setMessage('')
        }, 1500)
      }
    } else {
      setScore(prev => Math.max(0, prev - 10))
      setMessage('Access denied. Try again.')
    }
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <h1 className="text-2xl font-mono text-accent-emerald mb-4">HACK THE SITE</h1>
          <p className="text-text-secondary mb-6">
            Welcome, hacker. Your mission is to complete a series of cybersecurity challenges.
            You have 5 minutes. Are you ready?
          </p>
          <button
            onClick={handleStart}
            className="w-full bg-accent-emerald/10 border border-accent-emerald text-accent-emerald px-4 py-2 rounded-lg hover:bg-accent-emerald/20 transition-colors"
          >
            START MISSION
          </button>
        </motion.div>
      </div>
    )
  }

  const currentChallenge = challenges[currentLevel]

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-mono text-accent-emerald">
            Level {currentLevel + 1}: {currentChallenge.title}
          </h2>
          <p className="text-sm text-text-secondary">
            Score: {score} pts
          </p>
        </div>
        <div className="text-right">
          <div className={cn(
            "text-2xl font-mono",
            timeLeft <= 60 ? "text-accent-red" : "text-accent-emerald"
          )}>
            {formatTime(timeLeft)}
          </div>
          <p className="text-sm text-text-secondary">Time Remaining</p>
        </div>
      </div>

      {/* Challenge Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <motion.div
          key={currentLevel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-6"
        >
          {/* Challenge Description */}
          <div className="bg-background-secondary/50 border border-accent-emerald/20 rounded-lg p-6">
            <p className="text-text mb-4">{currentChallenge.description}</p>
            {showHint && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-accent-blue text-sm"
              >
                Hint: {currentChallenge.hint}
              </motion.p>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-background border border-accent-emerald/20 rounded-lg px-4 py-2 text-text placeholder-text-secondary focus:border-accent-emerald/40 transition-colors"
                placeholder="Enter your solution..."
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-accent-emerald/10 border border-accent-emerald text-accent-emerald px-4 py-2 rounded-lg hover:bg-accent-emerald/20 transition-colors"
              >
                Submit Solution
              </button>
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="bg-accent-blue/10 border border-accent-blue text-accent-blue px-4 py-2 rounded-lg hover:bg-accent-blue/20 transition-colors"
              >
                Show Hint
              </button>
            </div>
          </form>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                "text-center py-2 rounded-lg",
                message.includes('denied') 
                  ? "text-accent-red" 
                  : "text-accent-emerald"
              )}
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
