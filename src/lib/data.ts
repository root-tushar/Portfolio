import { Project, Service, Testimonial, BlogPost, PricingTier, CaseStudy } from './types';

// Projects
export const projects: Project[] = [
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
    description: 'Automated script for Linux system hardening and security configuration using CIS benchmarks.',
    technologies: ['Bash', 'Linux Security', 'Automation', 'CIS Benchmarks'],
    image: '/api/placeholder/400/300',
    githubUrl: '#',
    liveUrl: '#',
    category: 'cybersecurity'
  },
  {
    id: '4',
    title: 'Password Security Tool',
    description: 'Advanced tool for analyzing password strength and detecting common security vulnerabilities.',
    technologies: ['Python', 'Cryptography', 'Hash Analysis', 'Security Testing'],
    image: '/api/placeholder/400/300',
    githubUrl: '#',
    liveUrl: '#',
    category: 'cybersecurity'
  }
];

// Services
export const services: Service[] = [
  {
    id: 'ai-1',
    title: 'AI Agents',
    description: 'Custom AI agents designed to automate tasks and enhance decision-making processes. Built with security-first principles.',
    icon: 'robot',
    features: ['Task Automation', 'Decision Support', 'Security Integration', 'Custom Training'],
    category: 'ai'
  },
  {
    id: 'ai-2',
    title: 'Automation Scripts',
    description: 'Efficient scripts to automate repetitive tasks, saving time and resources while maintaining security standards.',
    icon: 'cogs',
    features: ['Process Automation', 'Security Compliance', 'Error Handling', 'Monitoring'],
    category: 'ai'
  },
  {
    id: 'ai-3',
    title: 'Business AI Integration',
    description: 'Seamlessly integrate AI into your business operations for improved efficiency and insights.',
    icon: 'chart-line',
    features: ['Workflow Optimization', 'Data Analysis', 'Performance Metrics', 'ROI Tracking'],
    category: 'ai'
  },
  {
    id: 'ai-4',
    title: 'AI Chatbots',
    description: 'Develop intelligent chatbots to enhance customer engagement and support with security awareness.',
    icon: 'comments',
    features: ['Natural Language Processing', 'Security Training', '24/7 Support', 'Analytics'],
    category: 'ai'
  },
  {
    id: 'ai-5',
    title: 'AI Cybersecurity Consulting',
    description: 'Leverage AI to strengthen your cybersecurity posture and protect digital assets.',
    icon: 'shield-alt',
    features: ['Threat Detection', 'Risk Assessment', 'Incident Response', 'Security Training'],
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
    title: 'Ethical Hacking Labs',
    description: 'Practice real-world attacks in safe environments like TryHackMe & Hack The Box.',
    icon: 'laptop-code',
    features: ['Hands-on Training', 'Real-world Scenarios', 'Progress Tracking', 'Skill Development'],
    category: 'cybersecurity'
  },
  {
    id: 'cyber-3',
    title: 'Incident Response',
    description: 'Professional incident response and recovery planning services.',
    icon: 'shield',
    features: ['Incident Investigation', 'Threat Hunting', 'Root Cause Analysis', 'Recovery Plans'],
    category: 'cybersecurity'
  },
  {
    id: 'cyber-4',
    title: 'Bug Hunting',
    description: 'Find and report basic security flaws like XSS and SQLi with systematic approach.',
    icon: 'bug',
    features: ['Vulnerability Research', 'Exploit Development', 'Responsible Disclosure', 'Bug Bounty Programs'],
    category: 'cybersecurity'
  },
  {
    id: 'cyber-5',
    title: 'Wireshark & Packet Analysis',
    description: 'Analyze traffic to detect suspicious behavior or potential leaks.',
    icon: 'network-wired',
    features: ['Traffic Analysis', 'Threat Detection', 'Network Forensics', 'Performance Monitoring'],
    category: 'cybersecurity'
  }
];

// Case Studies
const webSecurityCase: CaseStudy = {
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
};

const linuxHardeningCase: CaseStudy = {
  id: 'case-2',
  title: 'Linux Hardening Script',
  excerpt: 'Automating Linux system hardening with industry best practices.',
  content: 'Comprehensive automated script for Linux system hardening and security configuration. Implements CIS benchmarks and security best practices.',
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
};

const passwordToolCase: CaseStudy = {
  id: 'case-3',
  title: 'Password Security Tool',
  excerpt: 'Building a comprehensive password security analysis tool.',
  content: 'Advanced tool for analyzing password strength and detecting common security vulnerabilities. Includes hash analysis and breach checking.',
  publishedAt: '2025-08-15',
  author: {
    name: 'Tushar',
    avatar: '/images/tushar.jpg'
  },
  tags: ['Python', 'Security', 'Cryptography', 'Password Analysis'],
  metrics: [
    {
      label: 'Passwords Analyzed',
      value: '1M+',
      description: 'Passwords checked against security best practices'
    }
  ],
  testimonial: {
    quote: 'This tool has helped us enforce stronger password policies.',
    author: 'Security Manager',
    role: 'Security Manager', 
    company: 'SecureCorp'
  }
};

const networkMonitorCase: CaseStudy = {
  id: 'case-4',
  title: 'Network Security Monitor',
  excerpt: 'Building a sophisticated network monitoring tool for threat detection.',
  content: 'A sophisticated network monitoring tool that detects and logs suspicious traffic patterns using Python and Wireshark.',
  publishedAt: '2025-08-14',
  author: {
    name: 'Tushar',
    avatar: '/images/tushar.jpg'
  },
  tags: ['Python', 'Network Security', 'Wireshark', 'Packet Analysis'],
  metrics: [
    {
      label: 'Threats Detected',
      value: '50+',
      description: 'Security threats identified and mitigated'
    }
  ],
  testimonial: {
    quote: 'The network monitor has significantly improved our threat detection capabilities.',
    author: 'Network Administrator',
    role: 'Network Administrator',
    company: 'TechFirm'
  }
};

export const caseStudies: CaseStudy[] = [
  webSecurityCase,
  linuxHardeningCase,
  passwordToolCase
];

// Testimonials
export const testimonials: Testimonial[] = [
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
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    role: 'Head of IT',
    company: 'MedTech Solutions',
    content: 'Tushar\'s approach to security is both thorough and creative. He helped us implement robust protections without disrupting operations.',
    rating: 5
  }
];

// Blog Posts
export const blogPosts: BlogPost[] = [
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

// Pricing Tiers
export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
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
    id: 'pro',
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
    id: 'enterprise',
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
export const platformStats = {
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
