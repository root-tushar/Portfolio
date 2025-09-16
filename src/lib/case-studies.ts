export const caseStudies = [
  {
    id: 'network-security-platform',
    title: 'Network Security Monitoring Platform',
    excerpt: 'Building a comprehensive network security monitoring platform for a leading enterprise.',
    publishedAt: '2025-07-15',
    author: {
      name: 'John Doe',
      avatar: '/avatars/john.jpg'
    },
    tags: ['Network Security', 'Python', 'Machine Learning', 'Enterprise'],
    metrics: [
      {
        label: 'Threat Detection',
        value: '99.9%',
        description: 'Accuracy in identifying security threats'
      },
      {
        label: 'Response Time',
        value: '<1s',
        description: 'Average time to detect and respond to threats'
      },
      {
        label: 'Cost Savings',
        value: '$2.5M',
        description: 'Annual cost savings through automated security measures'
      }
    ],
    content: `# Challenge
Our client, a Fortune 500 company, needed a robust network security monitoring solution that could handle their massive global infrastructure. They were facing increasing security threats and their existing tools weren't scaling effectively.

# Solution
We developed a custom network security monitoring platform that combines real-time threat detection with machine learning capabilities. The solution processes over 1 million events per second and uses advanced algorithms to identify potential security breaches.

# Implementation
- Built scalable data processing pipeline using Apache Kafka
- Implemented machine learning models for anomaly detection
- Developed real-time alerting system with configurable thresholds
- Created comprehensive dashboard for security analysts

# Results
The platform has been a game-changer for the client's security operations:
- 99.9% accuracy in threat detection
- Reduced false positives by 85%
- Automated response to common threats
- Significant cost savings through prevention

# Lessons Learned
The project highlighted the importance of:
1. Scalable architecture from day one
2. Close collaboration with security teams
3. Continuous model training and refinement
4. Clear incident response protocols`,
    testimonial: {
      quote: "This platform has transformed how we handle network security. The automated threat detection and response capabilities have made our operations significantly more efficient.",
      author: "Sarah Johnson",
      role: "Chief Security Officer",
      company: "Enterprise Corp"
    },
    images: [
      {
        url: '/cases/network-security/dashboard.png',
        alt: 'Security monitoring dashboard',
        caption: 'Main security monitoring dashboard showing real-time threat detection'
      },
      {
        url: '/cases/network-security/architecture.png',
        alt: 'System architecture',
        caption: 'High-level architecture of the security monitoring platform'
      }
    ]
  },
  {
    id: 'ai-security-assistant',
    title: 'AI Security Assistant',
    excerpt: 'Developing an AI-powered security assistant that helps teams identify and respond to threats faster.',
    publishedAt: '2025-06-01',
    author: {
      name: 'Jane Smith',
      avatar: '/avatars/jane.jpg'
    },
    tags: ['Artificial Intelligence', 'Security', 'Machine Learning', 'ChatGPT'],
    metrics: [
      {
        label: 'Time Saved',
        value: '75%',
        description: 'Reduction in time to analyze security incidents'
      },
      {
        label: 'Accuracy',
        value: '95%',
        description: 'Accuracy in threat classification'
      },
      {
        label: 'ROI',
        value: '300%',
        description: 'Return on investment in the first year'
      }
    ],
    content: `# Challenge
Security teams were overwhelmed with the volume of alerts and spent too much time on initial analysis of potential threats. They needed a way to automate the initial assessment and get actionable insights faster.

# Solution
We developed an AI Security Assistant that leverages advanced language models and machine learning to:
- Automatically analyze security alerts
- Provide context and recommended actions
- Learn from past incidents
- Generate detailed incident reports

# Implementation
The implementation involved:
- Fine-tuning GPT models for security domain
- Building integrations with security tools
- Creating conversational interface
- Implementing feedback loops for continuous learning

# Results
The AI Security Assistant has delivered impressive results:
- 75% reduction in initial analysis time
- 95% accuracy in threat classification
- Improved consistency in incident handling
- Better knowledge retention and transfer

# Future Developments
We continue to enhance the assistant with:
- More sophisticated reasoning capabilities
- Broader tool integrations
- Improved explainability
- Advanced automation features`,
    testimonial: {
      quote: "The AI Security Assistant has become an indispensable member of our security team. It's like having a senior analyst available 24/7 to provide instant insights and guidance.",
      author: "Michael Chen",
      role: "Security Operations Manager",
      company: "Tech Solutions Inc"
    },
    images: [
      {
        url: '/cases/ai-assistant/interface.png',
        alt: 'AI Assistant Interface',
        caption: 'The conversational interface of the AI Security Assistant'
      },
      {
        url: '/cases/ai-assistant/analytics.png',
        alt: 'Performance Analytics',
        caption: 'Dashboard showing the impact on security operations'
      }
    ]
  }
]
