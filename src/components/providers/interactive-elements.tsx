'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ParticleBG = dynamic(() => import('../ParticleBG').then(mod => mod.default), {
  ssr: false,
  loading: () => null
})

const Terminal = dynamic(() => import('../ui/Terminal').then(mod => mod.default), {
  ssr: false,
  loading: () => null
})

const Chatbot = dynamic(() => import('../ui/Chatbot').then(mod => mod.default), {
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
