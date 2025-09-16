'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { Terminal, Network, Bug, Play, Trophy, Clock } from 'lucide-react'
import Link from 'next/link'

const games = [
  {
    id: 'terminal-quest',
    title: 'Terminal Quest',
    description: 'Navigate through a simulated terminal to complete cybersecurity challenges. Learn basic commands and security concepts.',
    icon: Terminal,
    difficulty: 'Beginner',
    timeEstimate: '5-10 min',
    color: 'accent-emerald'
  },
  {
    id: 'packet-sniffer',
    title: 'Packet Sniffer Puzzle',
    description: 'Analyze network traffic to identify malicious packets. Practice your network forensics skills.',
    icon: Network,
    difficulty: 'Intermediate',
    timeEstimate: '8-15 min',
    color: 'accent-blue'
  },
  {
    id: 'web-vuln-hunt',
    title: 'Web Vulnerability Hunt',
    description: 'Find and exploit common web vulnerabilities in a safe environment. Learn about XSS, SQLi, and more.',
    icon: Bug,
    difficulty: 'Advanced',
    timeEstimate: '10-20 min',
    color: 'accent-red'
  }
]

export default function LabPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-6xl font-bold mb-6"
          >
            Cybersecurity <span className="text-gradient">Lab</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
          >
            Hands-on cybersecurity challenges and mini-games to test your skills and learn new techniques. All games are educational and safe to play.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-4 text-sm text-text-secondary"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>Safe Environment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>Educational Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-emerald rounded-full" />
              <span>Progress Tracking</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glow-card p-8 hover:scale-105 transition-transform duration-300 cursor-pointer group"
              >
                <div className={`w-16 h-16 bg-${game.color}/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <game.icon className={`w-8 h-8 text-${game.color}`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-text">
                  {game.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed mb-6">
                  {game.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.difficulty === 'Beginner' ? 'bg-accent-emerald/20 text-accent-emerald' :
                      game.difficulty === 'Intermediate' ? 'bg-accent-blue/20 text-accent-blue' :
                      'bg-accent-red/20 text-accent-red'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Time:</span>
                    <span className="text-text">{game.timeEstimate}</span>
                  </div>
                </div>

                <Link
                  href={`/lab/${game.id}`}
                  className={`inline-flex items-center justify-center w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    game.color === 'accent-emerald' ? 'bg-accent-emerald text-background hover:bg-accent-emerald/90' :
                    game.color === 'accent-blue' ? 'bg-accent-blue text-background hover:bg-accent-blue/90' :
                    'bg-accent-red text-background hover:bg-accent-red/90'
                  }`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Game
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glow-card p-8 max-w-2xl mx-auto">
              <Trophy className="w-16 h-16 text-accent-cta mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">
                Track Your Progress
              </h3>
              <p className="text-text-secondary mb-6">
                Complete challenges to earn points and climb the leaderboard. Your progress is saved locally for privacy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-accent-emerald mb-1">0</div>
                  <div className="text-sm text-text-secondary">Games Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-blue mb-1">0</div>
                  <div className="text-sm text-text-secondary">Total Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-cta mb-1">0</div>
                  <div className="text-sm text-text-secondary">Achievements</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Safety Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-accent-red/10 border border-accent-red/30 rounded-lg p-6 max-w-3xl mx-auto">
              <h4 className="text-lg font-semibold text-accent-red mb-2">
                ⚠️ Educational Purpose Only
              </h4>
              <p className="text-text-secondary text-sm">
                All games in this lab are designed for educational purposes. The techniques demonstrated are for learning cybersecurity concepts in a safe, controlled environment. Never attempt these techniques on systems you don't own or have explicit permission to test.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
