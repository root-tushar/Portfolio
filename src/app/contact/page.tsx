'use client'

import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Send, Calendar, MessageCircle, Shield } from 'lucide-react'
import { trackEvent } from '@/components/GoogleAnalytics'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
    submit: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
      submit: ''
    }
    let isValid = true

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!validateForm()) {
      setIsSubmitting(false)
      return
    }

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      const response = await fetch('https://formspree.io/f/mldwqjdk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        // Track successful form submission
        trackEvent('form_submit', 'contact', 'contact_form_success')
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      // Track form submission error
      trackEvent('form_submit', 'contact', 'contact_form_error')
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit form. Please try again.'
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }

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
            Let's <span className="text-gradient">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto mb-8"
          >
            Ready to secure and automate your business? Book a free 30-minute consultation or send me a message. I'm here to help you build a safer, smarter future.
          </motion.p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-background">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glow-card text-center p-8"
            >
              <Calendar className="w-16 h-16 text-accent-cta mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Free Consultation</h3>
              <p className="text-text-secondary mb-6">
                Book a 30-minute call to discuss your security needs and AI goals.
              </p>
              <a
                href="https://calendly.com/your-calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Schedule Call
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glow-card text-center p-8"
            >
              <MessageCircle className="w-16 h-16 text-accent-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Direct Message</h3>
              <p className="text-text-secondary mb-6">
                Send me a detailed message about your project requirements.
              </p>
              <a href="#contact-form" className="btn-secondary">
                Send Message
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glow-card text-center p-8"
            >
              <Shield className="w-16 h-16 text-accent-emerald mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Emergency Response</h3>
              <p className="text-text-secondary mb-6">
                Need immediate security assistance? I'm available for urgent situations.
              </p>
              <a href="mailto:emergency@tushar.com" className="btn-primary">
                Emergency Contact
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Send Me a <span className="text-gradient">Message</span>
              </h2>
              <p className="text-xl text-text-secondary">
                Tell me about your project, security concerns, or AI implementation goals.
              </p>
            </div>

            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                method="POST"
                className="glow-card p-8"
              >
                {/* Hidden input for Formspree */}
                <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
                <input type="hidden" name="_next" value="https://root-tushar.github.io/Portfolio/contact" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20"
                    placeholder="What's this about?"
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-accent-red/30 rounded-lg text-text placeholder-text-secondary focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/20 resize-none"
                    placeholder="Tell me about your project, security needs, or questions..."
                  />
                </div>

                {errors.submit && (
                  <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg text-accent-red text-center">
                    {errors.submit}
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glow-card p-12 text-center"
              >
                <div className="w-20 h-20 bg-accent-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-background" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                <p className="text-xl text-text-secondary mb-6">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
