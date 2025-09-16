'use client';
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { caseStudies } from '@/lib/data'
import { ArrowRight, Calendar, User, Clock } from 'lucide-react'
import Link from 'next/link'

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-text">Case Studies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((caseStudy) => (
            <Link 
              href={`/cases/${caseStudy.id}`}
              key={caseStudy.id}
              className="glow-card p-8 hover:scale-105 transition-transform duration-300"
            >
              <article>
                <div className="flex flex-wrap gap-2 mb-4">
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent-red/20 text-accent-red rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold mb-3 text-text">
                  {caseStudy.title}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {caseStudy.excerpt}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {caseStudy.metrics && caseStudy.metrics.map((metric, index) => (
                    <div key={index} className="text-center p-3 bg-background-secondary/30 rounded-lg">
                      <div className={`text-2xl font-bold ${index === 0 ? 'text-accent-emerald' : index === 1 ? 'text-accent-blue' : 'text-accent-purple'} mb-1`}>
                        {metric.value}
                      </div>
                      <div className="text-sm text-text-secondary">{metric.label}</div>
                    </div>
                  ))}
                  {(!caseStudy.metrics || caseStudy.metrics.length === 0) && (
                    <>
                      <div className="text-center p-3 bg-background-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-accent-blue mb-1">N/A</div>
                        <div className="text-sm text-text-secondary">Timeframe</div>
                      </div>
                      <div className="text-center p-3 bg-background-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-accent-cta mb-1">N/A</div>
                        <div className="text-sm text-text-secondary">Cost Savings</div>
                      </div>
                      <div className="text-center p-3 bg-background-secondary/30 rounded-lg">
                        <div className="text-2xl font-bold text-accent-purple mb-1">N/A</div>
                        <div className="text-sm text-text-secondary">Results</div>
                      </div>
                    </>
                  )}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-text-secondary mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{caseStudy.author?.name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{caseStudy.publishedAt ? new Date(caseStudy.publishedAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300">
                  Read Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <h3 className="text-3xl font-bold mb-4">
            Ready to See Similar Results?
          </h3>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help your business achieve the same level of security and efficiency improvements.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Start Your Project
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
