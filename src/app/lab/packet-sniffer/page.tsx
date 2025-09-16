'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Play, Pause, RotateCcw, HelpCircle, Trophy, Clock, Filter } from 'lucide-react'
import Link from 'next/link'

interface Packet {
  id: number
  source: string
  destination: string
  protocol: string
  port: number
  payload: string
  malicious: boolean
}

export default function PacketSnifferPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [packets, setPackets] = useState<Packet[]>([])
  const [filteredPackets, setFilteredPackets] = useState<Packet[]>([])
  const [filters, setFilters] = useState({
    protocol: '',
    port: '',
    source: '',
    destination: ''
  })
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Generate sample packets
  useEffect(() => {
    const samplePackets: Packet[] = [
      { id: 1, source: '192.168.1.100', destination: '10.0.0.5', protocol: 'TCP', port: 80, payload: 'GET / HTTP/1.1', malicious: false },
      { id: 2, source: '10.0.0.5', destination: '192.168.1.100', protocol: 'TCP', port: 80, payload: 'HTTP/1.1 200 OK', malicious: false },
      { id: 3, source: '192.168.1.101', destination: '10.0.0.5', protocol: 'UDP', port: 53, payload: 'DNS Query', malicious: false },
      { id: 4, source: '10.0.0.5', destination: '192.168.1.101', protocol: 'UDP', port: 53, payload: 'DNS Response', malicious: false },
      { id: 5, source: '192.168.1.102', destination: '10.0.0.5', protocol: 'TCP', port: 22, payload: 'SSH Connection', malicious: false },
      { id: 6, source: '10.0.0.5', destination: '192.168.1.102', protocol: 'TCP', port: 22, payload: 'SSH Key Exchange', malicious: false },
      { id: 7, source: '192.168.1.103', destination: '10.0.0.5', protocol: 'TCP', port: 443, payload: 'HTTPS Request', malicious: false },
      { id: 8, source: '10.0.0.5', destination: '192.168.1.103', protocol: 'TCP', port: 443, payload: 'HTTPS Response', malicious: false },
      { id: 9, source: '192.168.1.104', destination: '10.0.0.5', protocol: 'TCP', port: 8080, payload: 'Malicious Payload: <script>alert("XSS")</script>', malicious: true },
      { id: 10, source: '10.0.0.5', destination: '192.168.1.104', protocol: 'TCP', port: 8080, payload: 'ACK', malicious: false }
    ]
    setPackets(samplePackets)
    setFilteredPackets(samplePackets)
  }, [])

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
  }

  const pauseGame = () => {
    setIsPlaying(false)
  }

  const resetGame = () => {
    setIsPlaying(false)
    setScore(0)
    setTimeElapsed(0)
    setGameCompleted(false)
    setFilters({ protocol: '', port: '', source: '', destination: '' })
    setFilteredPackets(packets)
  }

  const applyFilters = () => {
    let filtered = packets
    if (filters.protocol) {
      filtered = filtered.filter(p => p.protocol === filters.protocol)
    }
    if (filters.port) {
      filtered = filtered.filter(p => p.port.toString() === filters.port)
    }
    if (filters.source) {
      filtered = filtered.filter(p => p.source.includes(filters.source))
    }
    if (filters.destination) {
      filtered = filtered.filter(p => p.destination.includes(filters.destination))
    }
    setFilteredPackets(filtered)
  }

  const selectPacket = (packet: Packet) => {
    if (packet.malicious) {
      setScore(prev => prev + 100)
      setGameCompleted(true)
    } else {
      setScore(prev => Math.max(0, prev - 10))
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
            <h1 className="text-3xl font-bold">Packet Sniffer Puzzle</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Trophy className="w-4 h-4 text-accent-cta" />
                <span>{score}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
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
                  Look for packets with unusual payloads or suspicious content. The malicious packet contains JavaScript code that could be used for XSS attacks.
                </p>
              </motion.div>
            )}

            {/* Filters */}
            <div className="glow-card p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Packet Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Protocol (TCP/UDP)"
                  value={filters.protocol}
                  onChange={(e) => setFilters(prev => ({ ...prev, protocol: e.target.value }))}
                  className="px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Port"
                  value={filters.port}
                  onChange={(e) => setFilters(prev => ({ ...prev, port: e.target.value }))}
                  className="px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Source IP"
                  value={filters.source}
                  onChange={(e) => setFilters(prev => ({ ...prev, source: e.target.value }))}
                  className="px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Destination IP"
                  value={filters.destination}
                  onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
                  className="px-3 py-2 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none"
                />
              </div>
              <button
                onClick={applyFilters}
                className="btn-primary flex items-center mx-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </button>
            </div>

            {/* Packet Stream */}
            <div className="glow-card p-6">
              <h3 className="text-xl font-bold mb-4">Network Traffic</h3>
              <div className="bg-background-secondary rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-6 gap-4 mb-3 text-sm font-semibold text-text-secondary border-b border-accent-red/20 pb-2">
                  <div>ID</div>
                  <div>Source</div>
                  <div>Destination</div>
                  <div>Protocol</div>
                  <div>Port</div>
                  <div>Payload</div>
                </div>
                {filteredPackets.map((packet) => (
                  <div
                    key={packet.id}
                    onClick={() => isPlaying && selectPacket(packet)}
                    className={`grid grid-cols-6 gap-4 py-2 text-sm border-b border-accent-red/10 cursor-pointer hover:bg-accent-red/5 transition-colors duration-200 ${
                      packet.malicious ? 'bg-accent-red/10 border-accent-red/30' : ''
                    }`}
                  >
                    <div className="font-mono">{packet.id}</div>
                    <div className="font-mono">{packet.source}</div>
                    <div className="font-mono">{packet.destination}</div>
                    <div className="font-mono">{packet.protocol}</div>
                    <div className="font-mono">{packet.port}</div>
                    <div className="font-mono truncate" title={packet.payload}>
                      {packet.payload}
                    </div>
                  </div>
                ))}
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
                  <h3 className="text-2xl font-bold mb-2">Malicious Packet Found!</h3>
                  <p className="text-text-secondary mb-4">
                    You successfully identified the malicious packet containing XSS code!
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
