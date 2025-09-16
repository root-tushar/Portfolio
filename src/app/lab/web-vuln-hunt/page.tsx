'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, HelpCircle, Trophy, Clock, Bug, Shield } from 'lucide-react'
import Link from 'next/link'

interface Vulnerability {
  id: string
  type: 'xss' | 'sqli' | 'idor'
  description: string
  payload: string
  found: boolean
  exploited: boolean
}

export default function WebVulnHuntPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([
    {
      id: 'xss-1',
      type: 'xss',
      description: 'Cross-Site Scripting in comment field',
      payload: '<script>alert("XSS")</script>',
      found: false,
      exploited: false
    },
    {
      id: 'sqli-1',
      type: 'sqli',
      description: 'SQL Injection in login form',
      payload: "' OR '1'='1",
      found: false,
      exploited: false
    },
    {
      id: 'idor-1',
      type: 'idor',
      description: 'Insecure Direct Object Reference in user profile',
      payload: 'Change user ID in URL',
      found: false,
      exploited: false
    }
  ])
  const [currentPayload, setCurrentPayload] = useState('')
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'comments' | 'profile'>('login')
  
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const startGame = () => {
    setIsPlaying(true)
    setScore(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    setVulnerabilities(prev => prev.map(v => ({ ...v, found: false, exploited: false })))
  }

  const pauseGame = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    setVulnerabilities(prev => prev.map(v => ({ ...v, found: false, exploited: false })))
    setCurrentPayload('')
  }

  const testPayload = () => {
    if (!currentPayload.trim()) return

    const newVulns = [...vulnerabilities]
    let foundVuln = false

    newVulns.forEach(vuln => {
      if (!vuln.found && currentPayload.includes(vuln.payload.split(' ')[0])) {
        vuln.found = true
        foundVuln = true
        setScore(prev => prev + 50)
      }
    })

    if (foundVuln) {
      setScore(prev => prev + 25)
    } else {
      setScore(prev => Math.max(0, prev - 5))
    }

    setVulnerabilities(newVulns)
    setCurrentPayload('')

    // Check if all vulnerabilities found
    if (newVulns.every(v => v.found)) {
      setGameCompleted(true)
    }
  }

  const exploitVulnerability = (vulnId: string) => {
    const newVulns = vulnerabilities.map(v => 
      v.id === vulnId ? { ...v, exploited: true } : v
    )
    setVulnerabilities(newVulns)
    setScore(prev => prev + 100)
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
            <h1 className="text-3xl font-bold">Web Vulnerability Hunt</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="w-4 h-4 text-accent-cta" />
                <span>{score}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <Clock className="w-4 h-4 text-accent-blue" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Interface */}
      <section className="py-8 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Game Controls */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {!isPlaying ? (
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
                onClick={() => setShowHint(!showHint)} 
                className="btn-secondary flex items-center"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                {showHint ? 'Hide' : 'Show'} Hint
              </button>
            </div>

            {/* Hint */}
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glow-card p-6 mb-6"
              >
                <h3 className="text-xl font-bold mb-2">💡 Hint</h3>
                <p className="text-text-secondary">
                  Look for input fields that don't properly sanitize user input. Try common payloads like script tags, SQL injection patterns, and parameter manipulation.
                </p>
              </motion.div>
            )}

            {/* Payload Tester */}
            <div className="glow-card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Payload Tester</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={currentPayload}
                  onChange={(e) => setCurrentPayload(e.target.value)}
                  placeholder="Enter your payload here..."
                  className="flex-1 px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none"
                  disabled={!isPlaying}
                />
                <button
                  onClick={testPayload}
                  disabled={!isPlaying || !currentPayload.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Payload
                </button>
              </div>
            </div>

            {/* Vulnerable Web App */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Web App Interface */}
              <div className="glow-card p-6">
                <h3 className="text-xl font-bold mb-4">Vulnerable Web Application</h3>
                
                {/* Tabs */}
                <div className="flex space-x-1 mb-4">
                  {(['login', 'comments', 'profile'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        activeTab === tab
                          ? 'bg-accent-red text-background'
                          : 'bg-background-secondary text-text-secondary hover:text-text'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                  {activeTab === 'login' && (
                    <div>
                      <h4 className="font-semibold mb-2">Login Form</h4>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Username"
                          className="w-full px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary"
                          disabled={!isPlaying}
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary"
                          disabled={!isPlaying}
                        />
                        <button className="w-full btn-primary" disabled={!isPlaying}>
                          Login
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'comments' && (
                    <div>
                      <h4 className="font-semibold mb-2">Comment System</h4>
                      <div className="space-y-3">
                        <textarea
                          placeholder="Add a comment..."
                          rows={3}
                          className="w-full px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary resize-none"
                          disabled={!isPlaying}
                        />
                        <button className="btn-primary" disabled={!isPlaying}>
                          Post Comment
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div>
                      <h4 className="font-semibold mb-2">User Profile</h4>
                      <div className="space-y-3">
                        <div className="text-sm text-text-secondary">
                          Current User ID: <span className="font-mono">123</span>
                        </div>
                        <div className="text-sm text-text-secondary">
                          Try changing the user ID in the URL to access other profiles
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vulnerability Tracker */}
              <div className="glow-card p-6">
                <h3 className="text-xl font-bold mb-4">Vulnerability Tracker</h3>
                <div className="space-y-4">
                  {vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        vuln.exploited
                          ? 'border-accent-emerald bg-accent-emerald/10'
                          : vuln.found
                          ? 'border-accent-blue bg-accent-blue/10'
                          : 'border-accent-red/30 bg-background-secondary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold capitalize">{vuln.type}</h4>
                        <div className="flex items-center space-x-2">
                          {vuln.found && (
                            <Bug className="w-4 h-4 text-accent-blue" />
                          )}
                          {vuln.exploited && (
                            <Shield className="w-4 h-4 text-accent-emerald" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">
                        {vuln.description}
                      </p>
                      <div className="text-xs font-mono text-accent-red mb-2">
                        Payload: {vuln.payload}
                      </div>
                      {vuln.found && !vuln.exploited && (
                        <button
                          onClick={() => exploitVulnerability(vuln.id)}
                          className="btn-secondary text-sm px-3 py-1"
                          disabled={!isPlaying}
                        >
                          Exploit
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Game Completed */}
            {gameCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mt-8"
              >
                <div className="glow-card p-8 max-w-md mx-auto">
                  <Trophy className="w-16 h-16 text-accent-emerald mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">All Vulnerabilities Found!</h3>
                  <p className="text-text-secondary mb-4">
                    You successfully identified and exploited all web vulnerabilities!
                  </p>
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-accent-emerald">
                      Final Score: {score}
                    </div>
                    <div className="text-text-secondary">
                      Time: {formatTime(timeElapsed)}
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
