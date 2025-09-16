import { Project, Service, Testimonial, BlogPost, PricingTier, CaseStudy } from './types';

// Projects section
const projects: Project[] = [
  {
    id: '1',
    title: 'Network Security Monitor',
    description: 'A sophisticated network monitoring tool that detects and logs suspicious traffic patterns using Python and Wireshark.',
    technologies: ['Python', 'Wireshark', 'Packet Analysis', 'Network Security'],
    image: '/api/placeholder/400/300',
    githubUrl: '#',
    liveUrl: '#',
    category: 'cybersecurity'
  },
  {
    id: '2',
    title: 'Web Security Scanner',
    description: 'Advanced web application vulnerability scanner focusing on OWASP Top 10 vulnerabilities.',
    technologies: ['Python', 'OWASP', 'SQL Injection', 'XSS Detection'],
    image: '/api/placeholder/400/300',
    githubUrl: '#',
    liveUrl: '#',
    category: 'cybersecurity'
  },
  {
    id: '3',
    title: 'Linux Hardening Script',
    description: 'Comprehensive automated script for Linux system hardening and security configuration.',
    technologies: ['Bash', 'Linux Security', 'Automation', 'CIS Benchmarks'],
    image: '/api/placeholder/400/300',
    githubUrl: '#',
    liveUrl: '#',
    category: 'cybersecurity'
  }
];

// Services section
const services: Service[] = [
  {
    id: 'ai-1',
    title: 'AI Agents',
    description: 'Custom AI agents designed to automate tasks and enhance decision-making processes. Built with security-first principles.',
    icon: 'robot',
    features: ['Task Automation', 'Decision Support', 'Security Integration', 'Custom Training'],
    category: 'ai'
  },
  {
    id: 'cyber-1',
    title: 'Vulnerability Scanning',
    description: 'Identify and report common security weaknesses in websites and systems with automated scanning.',
    icon: 'search',
    features: ['Automated Scanning', 'Detailed Reporting', 'Remediation Guidance', 'Continuous Monitoring'],
    category: 'cybersecurity'
  },
  {
    id: 'cyber-2',
    title: 'Incident Response',
    description: 'Professional incident response and recovery planning services.',
    icon: 'shield',
    features: ['Incident Investigation', 'Threat Hunting', 'Root Cause Analysis', 'Recovery Plans'],
    category: 'cybersecurity'
  }
];

// Case Studies section
const caseStudies: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Web Security Scanner',
    excerpt: 'Building an advanced web application vulnerability scanner to detect OWASP Top 10 vulnerabilities.',
    content: 'Advanced web application vulnerability scanner focusing on OWASP Top 10 vulnerabilities. Includes automated testing and detailed reporting.',
    publishedAt: '2025-08-17',
    author: {
      name: 'Tushar',
      avatar: '/images/tushar.jpg'
    },
    tags: ['Security', 'OWASP', 'Python', 'Web Security'],
    metrics: [
      {
        label: 'Vulnerabilities Detected',
        value: '100+',
        description: 'Common web security issues identified'
      }
    ],
    testimonial: {
      quote: 'The scanner has helped us identify and fix critical vulnerabilities before they could be exploited.',
      author: 'Security Director',
      role: 'Security Director',
      company: 'MegaCorp'
    }
  },
  {
    id: 'case-2',
    title: 'Linux Hardening Script',
    excerpt: 'Automating Linux system hardening with industry best practices.',
    content: 'Comprehensive automated script for Linux system hardening and security configuration.',
    publishedAt: '2025-08-16',
    author: {
      name: 'Tushar',
      avatar: '/images/tushar.jpg'
    },
    tags: ['Linux', 'Security', 'Automation', 'CIS Benchmarks'],
    metrics: [
      {
        label: 'Security Controls',
        value: '50+',
        description: 'Industry standard security controls implemented'
      }
    ],
    testimonial: {
      quote: 'The hardening script has significantly improved our security posture.',
      author: 'System Administrator',
      role: 'System Administrator',
      company: 'TechCorp'
    }
  }
];

// Blog Posts section
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of AI in Cybersecurity',
    excerpt: 'Exploring how artificial intelligence is revolutionizing threat detection and response.',
    content: 'Full blog content here...',
    publishedAt: '2025-08-15',
    author: {
      name: 'Tushar',
      image: '/images/tushar.jpg'
    },
    tags: ['AI', 'Cybersecurity', 'Future Tech'],
    image: '/blog/ai-security.jpg',
    readingTime: '8 min read'
  },
  {
    id: '2',
    title: 'Building a Security Testing Lab',
    excerpt: 'A comprehensive guide to setting up your own security testing environment.',
    content: 'Full blog content here...',
    publishedAt: '2025-08-10',
    author: {
      name: 'Tushar',
      image: '/images/tushar.jpg'
    },
    tags: ['Security', 'Tutorial', 'Lab Setup'],
    image: '/blog/security-lab.jpg',
    readingTime: '12 min read'
  }
];

// Testimonials section
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechStart Inc.',
    content: 'Tushar transformed our security posture in just 30 days. His AI-powered solutions are both innovative and practical.',
    rating: 5,
    avatar: '/images/testimonials/sarah.jpg'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Security Director',
    company: 'GlobalBank',
    content: 'Working with Tushar was a game-changer. His expertise in both cybersecurity and AI is rare and valuable.',
    rating: 5,
    avatar: '/images/testimonials/marcus.jpg'
  }
];

// Pricing section
const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$2,500',
    description: 'Perfect for small businesses starting their security journey',
    features: [
      'Security Assessment',
      'Basic AI Integration',
      '24/7 Monitoring Setup',
      'Monthly Reports',
      'Email Support'
    ],
    cta: 'Get Started'
  },
  {
    name: 'Pro',
    price: '$7,500',
    description: 'Comprehensive security and AI solutions for growing companies',
    features: [
      'Everything in Starter',
      'Penetration Testing',
      'AI Agent Development',
      'Incident Response',
      'Weekly Reports',
      'Priority Support'
    ],
    recommended: true,
    cta: 'Choose Pro'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for large organizations with complex needs',
    features: [
      'Everything in Pro',
      'Custom AI Development',
      'Security Architecture',
      'Team Training',
      'Dedicated Support',
      'Custom Integrations'
    ],
    cta: 'Contact Sales'
  }
];

// Platform Statistics
const platformStats = {
  tryHackMe: {
    rank: 'Top 1%',
    rooms: '300+',
    logo: 'https://assets.tryhackme.com/img/favicon.png'
  },
  hackTheBox: {
    rank: 'Pro Hacker',
    machines: '15+',
    logo: 'https://app.hackthebox.com/images/HTB-favicon.png'
  },
  personalLab: {
    hours: '50+',
    description: 'Hands-on Practice'
  }
};

export {
  projects,
  services,
  caseStudies,
  blogPosts,
  testimonials,
  pricingTiers,
  platformStats
};
