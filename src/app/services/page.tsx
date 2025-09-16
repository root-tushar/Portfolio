import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { services } from '@/lib/data'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const aiServices = services.filter(service => service.category === 'ai')
  const cyberServices = services.filter(service => service.category === 'cybersecurity')

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Professional <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            From AI-powered automation to comprehensive cybersecurity solutions, I provide the expertise and tools your business needs to thrive in the digital age.
          </p>
          <div>
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      {/* AI Services */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              AI <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Leverage the power of artificial intelligence to automate processes, enhance decision-making, and gain competitive advantages while maintaining security.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {aiServices.map((service, index) => (
              <div
                key={service.id}
                className="glow-card p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-accent-emerald mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-accent-red hover:text-accent-cta transition-colors duration-300"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cybersecurity Services */}
      <section className="py-20 bg-background-secondary/30">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-gradient">Cybersecurity</span> Services
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive security solutions to protect your digital assets, identify vulnerabilities, and build resilient systems that can withstand modern threats.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cyberServices.map((service, index) => (
              <div
                key={service.id}
                className="glow-card p-8"
              >
                <div className="mb-6 text-accent-emerald">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-accent-emerald mr-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact" 
                  className="btn-outline-emerald inline-flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Let's discuss how I can help you implement secure, intelligent solutions that drive growth and protect your assets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Book Free Consultation
              </Link>
              <Link href="/cases" className="btn-secondary text-lg px-8 py-4">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
