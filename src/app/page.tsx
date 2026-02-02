'use client'

import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { AboutMe } from '@/components/AboutMe'
import { ServicesPreview } from '@/components/ServicesPreview'

import { PricingSection } from '@/components/PricingSection'
import { LeadMagnetSection } from '@/components/LeadMagnetSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <Nav />
      <div className="flex flex-col gap-24 pb-16">
        <Hero />
        <ServicesPreview />
        <PricingSection />
        <LeadMagnetSection />
      </div>
      <Footer />
    </main>
  )
}
