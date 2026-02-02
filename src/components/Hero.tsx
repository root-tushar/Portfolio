'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Download, Terminal, Linkedin, Github, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'
import { ShaderHero } from './ShaderHero'
import ParticleBG from './ParticleBG'
import { NeonButton } from './ui/neon-button'
import { CyberCard } from './ui/cyber-card'
import MatrixBackground from './ui/matrix-background'
import { CustomCursor } from './ui/custom-cursor'
import { MobileTouchEffects } from './ui/mobile-touch-effects'
import { MobileHeroEffects } from './ui/mobile-hero-effects'
import { HoverSound } from './ui/hover-sound'
import { trackEvent } from './GoogleAnalytics'
import { useState } from 'react'

export function Hero() {
  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <ShaderHero />
        <ParticleBG />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* Terminal-style brand tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald mb-8"
          >
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm">AI + Cybersecurity Expert</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-text"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Protect & Automate{' '}
            <span className="block mt-2 ml-8 text-accent-emerald" style={{ fontStyle: 'italic', fontWeight: 600 }}>
              Your Business
            </span>
            <span className="text-gradient relative inline-block mt-3">
              in 30 Days
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto font-light"
            style={{ letterSpacing: '0.3px' }}
          >
            AI agents + Cyber defense that cut costs and risks — built by one dedicated expert.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            style={{ marginLeft: '-12px' }}
          >
            <Link 
              href="/contact" 
              className="btn-primary group mobile-pulse"
              onClick={() => trackEvent('click', 'cta', 'hero_book_consultation')}
              style={{ transform: 'rotate(-1deg)' }}
            >
              Book Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link href="/services" className="btn-secondary mobile-float" style={{ transform: 'rotate(0.5deg)' }}>
              Explore Services
            </Link>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-16"
          >
            <NeonButton
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent('click', 'cta', 'hero_book_free_consultation')
                window.location.href = '/contact'
              }}
              glowColor="#2ECC71"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </NeonButton>

            <NeonButton
              variant="outline"
              size="lg"
              onClick={() => {
                trackEvent('click', 'download', 'hero_download_resume')
                window.location.href = '/Resume (1).pdf'
              }}
              glowColor="#1976D2"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </NeonButton>
          </motion.div>

          {/* Achievement Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            style={{ marginTop: '2rem', marginBottom: '1rem' }}
          >
            <div style={{ transform: 'rotate(-0.5deg)' }}>
              <CyberCard className="p-6" glowColor="#2ECC71">
                <h3 className="text-xl font-mono text-accent-emerald mb-2">Top 1%</h3>
                <p className="text-text-secondary">TryHackMe Rank</p>
              </CyberCard>
            </div>

            <div style={{ transform: 'rotate(0.3deg)' }}>
              <CyberCard className="p-6" glowColor="#E53935">
                <h3 className="text-xl font-mono text-accent-red mb-2">Pro Hacker</h3>
                <p className="text-text-secondary">HackTheBox Status</p>
              </CyberCard>
            </div>

            <div style={{ transform: 'rotate(-0.2deg)' }}>
              <CyberCard className="p-6" glowColor="#1976D2">
                <h3 className="text-xl font-mono text-accent-blue mb-2">50+ Hours</h3>
                <p className="text-text-secondary">Lab Practice</p>
              </CyberCard>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="group relative"
                aria-label={social.label}
              >
                <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-emerald/10" />
                <social.icon className="h-6 w-6 text-text-secondary group-hover:text-accent-emerald transition-colors duration-300" />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-accent-red rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-accent-red rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Interactive Elements */}
      <CustomCursor />
      <MobileTouchEffects />
      <MobileHeroEffects />
      <HoverSound>
        <div className="hidden">Sound Effect Wrapper</div>
      </HoverSound>
    </section>
  )
}
