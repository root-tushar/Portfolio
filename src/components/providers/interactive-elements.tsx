'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ParticleBG = dynamic(() => import('../ParticleBG').then(mod => ({ default: mod.ParticleBG })), {
  ssr: false,
  loading: () => null
})

const Terminal = dynamic(() => import('../ui/Terminal').then(mod => ({ default: mod.Terminal })), {
  ssr: false,
  loading: () => null
})

const Chatbot = dynamic(() => import('../ui/Chatbot').then(mod => ({ default: mod.Chatbot })), {
  ssr: false,
  loading: () => null
})

const FloatingActions = dynamic(() => import('../ui/FloatingActions').then(mod => ({ default: mod.FloatingActions })), {
  ssr: false,
  loading: () => null
})

export function InteractiveElements() {
  return (
    <>
      <Suspense fallback={null}>
        <ParticleBG />
      </Suspense>
      
      <Suspense fallback={null}>
        <Terminal />
        <Chatbot />
        <FloatingActions />
      </Suspense>
    </>
  )
}
