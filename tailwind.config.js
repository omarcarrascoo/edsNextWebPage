/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05080D',
          900: '#070A0F',
          850: '#0B0F16',
          800: '#0E141B',
          700: '#121A24',
          600: '#1A2330',
          500: '#243042',
        },
        fog: {
          50: '#F4F7FA',
          100: '#E2E8F0',
          200: '#C7D1DE',
          300: '#A8B3C1',
          400: '#7C8A9C',
          500: '#566273',
        },
        accent: {
          DEFAULT: '#2DE2C5',
          glow: '#38F0D2',
          deep: '#0FB9A0',
          soft: '#7AF0DC',
        },
        signal: {
          blue: '#38BDF8',
          green: '#22D39A',
          amber: '#F5B544',
          red: '#F26B6B',
          violet: '#7C8CFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 5.25rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'eyebrow': ['0.78rem', { lineHeight: '1.2', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at top, rgba(45,226,197,0.08), transparent 60%)',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
      },
      boxShadow: {
        'glow-accent': '0 0 0 1px rgba(45,226,197,0.18), 0 8px 40px -8px rgba(45,226,197,0.35)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px -16px rgba(0,0,0,0.6)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px -20px rgba(45,226,197,0.18)',
      },
      animation: {
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'scan-line': 'scanLine 4s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
