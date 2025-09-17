
import React from 'react'
import { caseStudies } from '@/lib/data'
import { CaseStudyClient } from './CaseStudyClient'

// Generate static params for all case studies
export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.id,
  }))
}

interface PageProps {
  params: {
    slug: string
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const caseStudy = caseStudies.find(cs => cs.id === params.slug)
  
  return <CaseStudyClient caseStudy={caseStudy} />
}
