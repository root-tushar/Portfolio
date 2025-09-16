/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: '#2A2A2A',
        background: {
          DEFAULT: '#000000',
          secondary: '#121212',
        },
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#B0B0B0',
        },
        accent: {
          red: '#E53935',
          emerald: '#2ECC71',
          blue: '#1976D2',
          cta: '#FFA500',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'typewriter': 'typewriter 3s steps(40) 1s 1 normal both',
        'float': 'float 6s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #E53935', filter: 'brightness(100%)' },
          '50%': { filter: 'brightness(150%)' },
          '100%': { boxShadow: '0 0 20px #E53935, 0 0 30px #E53935', filter: 'brightness(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'cyber-pattern': "url('/patterns/cyber-grid.svg')",
        'glow-gradient': 'linear-gradient(180deg, rgba(46, 204, 113, 0.15) 0%, rgba(46, 204, 113, 0) 100%)',
        'hero-gradient': 'radial-gradient(circle at center, rgba(46, 204, 113, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
      },
    },
  },
  plugins: [],
};
