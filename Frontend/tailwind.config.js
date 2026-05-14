/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ──────── Colors (DESIGN.md) ──────── */
      colors: {
        primary:            '#0066cc',
        'primary-focus':    '#0071e3',
        'primary-on-dark':  '#2997ff',
        ink:                '#1d1d1f',
        'ink-muted-80':     '#333333',
        'ink-muted-48':     '#7a7a7a',
        'body-muted':       '#cccccc',
        canvas:             '#ffffff',
        'canvas-parchment': '#f5f5f7',
        'surface-pearl':    '#fafafc',
        'surface-tile-1':   '#272729',
        'surface-tile-2':   '#2a2a2c',
        'surface-tile-3':   '#252527',
        'surface-black':    '#000000',
        'surface-chip':     '#d2d2d7',
        hairline:           '#e0e0e0',
        'divider-soft':     '#f0f0f0',
        'on-primary':       '#ffffff',
        'on-dark':          '#ffffff',
      },

      /* ──────── Typography (DESIGN.md) ──────── */
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'hero':       ['56px', { lineHeight: '1.07', letterSpacing: '-0.28px',  fontWeight: '600' }],
        'display-lg': ['40px', { lineHeight: '1.1',  letterSpacing: '0',        fontWeight: '600' }],
        'display-md': ['34px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '600' }],
        'lead':       ['28px', { lineHeight: '1.14', letterSpacing: '0.196px',  fontWeight: '400' }],
        'lead-airy':  ['24px', { lineHeight: '1.5',  letterSpacing: '0',        fontWeight: '300' }],
        'tagline':    ['21px', { lineHeight: '1.19', letterSpacing: '0.231px',  fontWeight: '600' }],
        'body-strong':['17px', { lineHeight: '1.24', letterSpacing: '-0.374px', fontWeight: '600' }],
        'body':       ['17px', { lineHeight: '1.47', letterSpacing: '-0.374px', fontWeight: '400' }],
        'dense-link': ['17px', { lineHeight: '2.41', letterSpacing: '0',        fontWeight: '400' }],
        'caption':    ['14px', { lineHeight: '1.43', letterSpacing: '-0.224px', fontWeight: '400' }],
        'caption-strong': ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px', fontWeight: '600' }],
        'btn-lg':     ['18px', { lineHeight: '1.0',  letterSpacing: '0',        fontWeight: '300' }],
        'btn-util':   ['14px', { lineHeight: '1.29', letterSpacing: '-0.224px', fontWeight: '400' }],
        'fine-print': ['12px', { lineHeight: '1.0',  letterSpacing: '-0.12px',  fontWeight: '400' }],
        'micro':      ['10px', { lineHeight: '1.3',  letterSpacing: '-0.08px',  fontWeight: '400' }],
        'nav-link':   ['12px', { lineHeight: '1.0',  letterSpacing: '-0.12px',  fontWeight: '400' }],
      },

      /* ──────── Border Radius (DESIGN.md) ──────── */
      borderRadius: {
        'xs':   '5px',
        'sm':   '8px',
        'md':   '11px',
        'lg':   '18px',
        'pill': '9999px',
      },

      /* ──────── Spacing (DESIGN.md) ──────── */
      spacing: {
        'xxs':     '4px',
        'xs':      '8px',
        'sm-sp':   '12px',
        'md-sp':   '17px',
        'lg-sp':   '24px',
        'xl-sp':   '32px',
        'xxl':     '48px',
        'section': '80px',
      },

      /* ──────── Box Shadow (DESIGN.md — product only) ──────── */
      boxShadow: {
        'product': '3px 5px 30px rgba(0, 0, 0, 0.22)',
        'soft':    '0 1px 0 rgba(0, 0, 0, 0.08)',
      },

      /* ──────── Backdrop Blur ──────── */
      backdropBlur: {
        'nav': '20px',
      },

      /* ──────── Screens (DESIGN.md breakpoints) ──────── */
      screens: {
        'xs':     '480px',
        'sm':     '640px',
        'tablet': '734px',
        'md':     '834px',
        'lg':     '1068px',
        'xl':     '1440px',
      },

      /* ──────── Animations ──────── */
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.8)' },
          '50%':      { opacity: '1',   transform: 'scale(1)' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in':   'fade-in 0.5s ease-out both',
        'slide-up':  'slide-up 0.4s ease-out both',
        'pulse-dot': 'pulse-dot 1.4s ease-in-out infinite',
        'spin-slow': 'spin-slow 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
