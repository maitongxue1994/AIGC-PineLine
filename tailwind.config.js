/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          0: '#07070B',
          1: '#0B0B12',
          2: '#11111B',
          3: '#17182A',
        },
        ink: {
          0: '#F6F6F7',
          1: '#C4C4CF',
          2: '#8C8C9A',
          3: '#5A5A66',
        },
        line: 'rgba(255,255,255,0.08)',
        brand: {
          DEFAULT: '#FF6A3D',
          violet: '#7C5CFF',
          pink: '#FF3D7F',
          cyan: '#22D3EE',
          lime: '#B6FF5F',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 7vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.75rem, 5.5vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
      },
      backgroundImage: {
        'grid-dark':
          'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,106,61,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 30%, rgba(124,92,255,0.18), transparent 60%)',
        'brand-gradient':
          'linear-gradient(120deg, #FF6A3D 0%, #FF3D7F 40%, #7C5CFF 80%, #22D3EE 100%)',
      },
      boxShadow: {
        glow: '0 0 80px -10px rgba(255,106,61,0.35), 0 0 40px -10px rgba(124,92,255,0.35)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 60px -30px rgba(0,0,0,0.8)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        spinSlow: 'spinSlow 18s linear infinite',
        scan: 'scan 2.5s linear infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
