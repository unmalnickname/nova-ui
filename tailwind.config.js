/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        nova: {
          bg: '#0f0f0f',
          'bg-secondary': '#18191c',
          'bg-tertiary': '#1a1a1a',
          input: '#1e1f22',
          card: '#1a1a1a',
          hover: 'rgba(255, 255, 255, 0.05)',
        },
        // Accents
        accent: {
          primary: '#5865F2',    // Nova Blue (Discord Blurple)
          cyan: '#00e5ff',       // Telemetry/data glow
          success: '#23a55a',    // Online/active (Emerald)
          danger: '#f23f42',     // Blockers/disconnect (Crimson)
          warning: '#FEE75C',    // Warning yellow
          orange: '#f59e0b',     // In progress
        },
        // Text
        text: {
          primary: '#ffffff',
          secondary: '#b5bac1',
          muted: '#72767d',
          subtle: '#4e5058',
        },
        // Borders
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.1)',
          focus: '#5865F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px
        xs: ['0.75rem', { lineHeight: '1rem' }],          // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],      // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],         // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],      // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],       // 20px
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        DEFAULT: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        glow: '0 0 15px rgba(88, 101, 242, 0.3)',
        'glow-lg': '0 0 25px rgba(88, 101, 242, 0.4)',
        'glow-success': '0 0 15px rgba(35, 165, 90, 0.3)',
        'glow-danger': '0 0 15px rgba(242, 63, 66, 0.3)',
        'glow-cyan': '0 0 15px rgba(0, 229, 255, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'speaking': 'speaking 1.5s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(88, 101, 242, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(88, 101, 242, 0.6)' },
        },
        'speaking': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(35, 165, 90, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(35, 165, 90, 0)' },
        },
      },
    },
  },
  plugins: [],
}
