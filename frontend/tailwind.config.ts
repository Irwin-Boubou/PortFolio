import type { Config } from 'tailwindcss';

/**
 * Design tokens from the Cahier de Charge §5.
 * Colors are wired to CSS variables so the light/dark toggle
 * only flips variables, Tailwind classes stay identical.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        secondary: '#00D9FF',
        success: '#00C896',
        error: '#FF4D6A',
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        body: 'var(--text)',
        muted: 'var(--text-muted)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: { content: '1280px' },
      spacing: { section: '96px' },
      animation: { 'gradient-x': 'gradient-x 8s ease infinite' },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
