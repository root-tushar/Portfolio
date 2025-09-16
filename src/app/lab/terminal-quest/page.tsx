'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, HelpCircle, Trophy, Clock } from 'lucide-react'
import Link from 'next/link'

interface GameState {
  isPlaying: boolean
  score: number
  level: number
  hints: number
  timeElapsed: number
}

const commands = [
  { command: 'help', description: 'Show available commands' },
  { command: 'scan', description: 'Scan for vulnerabilities' },
  { command: 'inspect host-10.0.0.5', description: 'Inspect specific host' },
  { command: 'crack', description: 'Attempt to crack password' },
  { command: 'submit-flag <hash>', description: 'Submit flag for points' }
]

const challenges = [
  {
    level: 1,
    description: 'Use the help command to see available options',
    command: 'help',
    hint: 'Type "help" and press Enter',
    points: 10
  },
  {
    level: 2,
    description: 'Scan the network for vulnerable hosts',
    command: 'scan',
    hint: 'Type "scan" and press Enter',
    points: 20
  },
  {
    level: 3,
    description: 'Inspect the host at 10.0.0.5',
    command: 'inspect host-10.0.0.5',
    hint: 'Type "inspect host-10.0.0.5" and press Enter',
    points: 30
  },
  {
    level: 4,
    description: 'Attempt to crack the password',
    command: 'crack',
    hint: 'Type "crack" and press Enter',
    points: 40
  },
  {
    level: 5,
    description: 'Submit the flag you found',
    command: 'submit-flag',
    hint: 'Type "submit-flag <hash>" with the hash you found',
    points: 50
  }
]

export default function TerminalQuestPage() {
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    level: 1,
    hints: 3,
    timeElapsed: 0
  })
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to Terminal Quest! Type "help" to begin.'])
  const [currentChallenge, setCurrentChallenge] = useState(challenges[0])
  const [showHint, setShowHint] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (gameState.isPlaying) {
      intervalRef.current = setInterval(() => {
        setGameState(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [gameState.isPlaying])

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true, score: 0, level: 1, timeElapsed: 0 }))
    setOutput(['Game started! Type "help" to see available commands.'])
    setCurrentChallenge(challenges[0])
    setGameCompleted(false)
    if (inputRef.current) inputRef.current.focus()
  }

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  const resetGame = () => {
    setGameState({
      isPlaying: false,
      score: 0,
      level: 1,
      hints: 3,
      timeElapsed: 0
    })
    setOutput(['Welcome to Terminal Quest! Type "help" to begin.'])
    setCurrentChallenge(challenges[0])
    setGameCompleted(false)
    setShowHint(false)
  }

  const handleCommand = (command: string) => {
    const newOutput = [...output]
    
    if (command === 'help') {
      newOutput.push('$ help')
      newOutput.push('Available commands:')
      commands.forEach(cmd => {
        newOutput.push(`  ${cmd.command} - ${cmd.description}`)
      })
    } else if (command === 'scan') {
      newOutput.push('$ scan')
      newOutput.push('Scanning network...')
      newOutput.push('Found vulnerable host: 10.0.0.5')
      newOutput.push('Level 2 completed! +20 points')
      setGameState(prev => ({ ...prev, score: prev.score + 20, level: 2 }))
      setCurrentChallenge(challenges[1])
    } else if (command === 'inspect host-10.0.0.5') {
      newOutput.push('$ inspect host-10.0.0.5')
      newOutput.push('Inspecting host...')
      newOutput.push('Found weak password hash: 5f4dcc3b5aa765d61d8327deb882cf99')
      newOutput.push('Level 3 completed! +30 points')
      setGameState(prev => ({ ...prev, score: prev.score + 30, level: 3 }))
      setCurrentChallenge(challenges[2])
    } else if (command === 'crack') {
      newOutput.push('$ crack')
      newOutput.push('Attempting to crack password...')
      newOutput.push('Password cracked: password')
      newOutput.push('Level 4 completed! +40 points')
      setGameState(prev => ({ ...prev, score: prev.score + 40, level: 4 }))
      setCurrentChallenge(challenges[3])
    } else if (command.startsWith('submit-flag')) {
      newOutput.push(`$ ${command}`)
      newOutput.push('Flag submitted successfully!')
      newOutput.push('Level 5 completed! +50 points')
      newOutput.push('🎉 Congratulations! You completed Terminal Quest!')
      setGameState(prev => ({ ...prev, score: prev.score + 50, level: 5 }))
      setGameCompleted(true)
    } else {
      newOutput.push(`$ ${command}`)
      newOutput.push('Command not recognized. Type "help" for available commands.')
    }
    
    setOutput(newOutput)
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && gameState.isPlaying) {
      handleCommand(input.trim())
    }
  }

  const useHint = () => {
    if (gameState.hints > 0) {
      setGameState(prev => ({ ...prev, hints: prev.hints - 1 }))
      setShowHint(true)
      setTimeout(() => setShowHint(false), 5000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Header */}
      <section className="pt-32 pb-8 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/lab" className="flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Lab
            </Link>
            <h1 className="text-3xl font-bold">Terminal Quest</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="w-4 h-4 text-accent-cta" />
                <span>{gameState.score}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-accent-blue" />
                <span>{formatTime(gameState.timeElapsed)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Interface */}
      <section className="py-8 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Game Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {!gameState.isPlaying ? (
                <button onClick={startGame} className="btn-primary flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </button>
              ) : (
                <>
                  <button onClick={pauseGame} className="btn-secondary flex items-center">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                  <button onClick={resetGame} className="btn-secondary flex items-center">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </button>
                </>
              )}
              <button 
                onClick={useHint} 
                disabled={gameState.hints === 0 || !gameState.isPlaying}
                className="btn-secondary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Hint ({gameState.hints})
              </button>
            </div>

            {/* Current Challenge */}
            {gameState.isPlaying && !gameCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glow-card p-6 mb-6"
              >
                <h3 className="text-xl font-bold mb-2">Level {currentChallenge.level}</h3>
                <p className="text-text-secondary mb-4">{currentChallenge.description}</p>
                {showHint && (
                  <div className="bg-accent-blue/20 border border-accent-blue/30 rounded-lg p-3">
                    <p className="text-accent-blue text-sm">
                      <strong>Hint:</strong> {currentChallenge.hint}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Terminal */}
            <div className="glow-card p-6">
              <div className="bg-background-secondary rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {output.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line}
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <form onSubmit={handleSubmit} className="mt-4 flex items-center">
                <span className="text-accent-emerald mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none outline-none text-text font-mono"
                  disabled={!gameState.isPlaying}
                />
              </form>
            </div>

            {/* Game Completed */}
            {gameCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-8"
              >
                <div className="glow-card p-8 max-w-md mx-auto">
                  <Trophy className="w-16 h-16 text-accent-cta mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Mission Complete!</h3>
                  <p className="text-text-secondary mb-4">
                    You've successfully completed Terminal Quest!
                  </p>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-accent-emerald">
                      Final Score: {gameState.score}
                    </div>
                    <div className="text-text-secondary">
                      Time: {formatTime(gameState.timeElapsed)}
                    </div>
                  </div>
                  <button onClick={resetGame} className="btn-primary mt-6">
                    Play Again
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
