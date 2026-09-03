/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          black: '#050505',
          charcoal: '#101010',
          coal: '#181818',
          ash: '#1e1e1e',
        },
        bone: {
          DEFAULT: '#E8E2D8',
          dim: '#B8B2A8',
          faint: '#77716A',
        },
        blood: {
          DEFAULT: '#B51F25',
          dark: '#641417',
          bright: '#D6282D',
          glow: '#FF2A30',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.3em',
        mega: '0.5em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
