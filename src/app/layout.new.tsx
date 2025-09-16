'use client'

import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/react'
import { InteractiveProvider } from '@/components/providers/interactive-provider'
import Terminal from '@/components/ui/Terminal'
import Chatbot from '@/components/ui/Chatbot'
import FloatingActions from '@/components/ui/FloatingActions'
import { ParticleBG } from '@/components/ParticleBG'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <InteractiveProvider>
          <ParticleBG />
          <main className="min-h-screen bg-background text-text antialiased">
            {children}
          </main>
          <FloatingActions />
          <Terminal />
          <Chatbot />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#121212',
                color: '#FFFFFF',
                border: '1px solid #2ECC71',
              },
            }}
          />
          <Analytics />
        </InteractiveProvider>
      </body>
    </html>
  )
}
