/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette with better contrast ratios
        bg: {
          DEFAULT: 'hsl(220, 20%, 98%)',
          dark: 'hsl(222, 47%, 11%)'
        },
        accent: {
          DEFAULT: 'hsl(140, 70%, 45%)', // Slightly darker for better contrast
          hover: 'hsl(140, 70%, 40%)',
          light: 'hsl(140, 70%, 90%)',
          dark: 'hsl(140, 70%, 30%)'
        },
        primary: {
          DEFAULT: 'hsl(210, 70%, 50%)',
          hover: 'hsl(210, 70%, 45%)',
          light: 'hsl(210, 70%, 90%)',
          dark: 'hsl(210, 70%, 35%)'
        },
        surface: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          dark: 'hsl(222, 47%, 15%)'
        },
        text: {
          primary: 'hsl(220, 25%, 15%)',
          secondary: 'hsl(220, 20%, 40%)',
          white: 'hsl(0, 0%, 100%)',
          dark: {
            primary: 'hsl(220, 25%, 95%)',
            secondary: 'hsl(220, 20%, 80%)'
          }
        },
        error: {
          DEFAULT: 'hsl(0, 90%, 60%)',
          light: 'hsl(0, 90%, 95%)',
          dark: 'hsl(0, 90%, 40%)'
        },
        warning: {
          DEFAULT: 'hsl(40, 90%, 50%)',
          light: 'hsl(40, 90%, 90%)',
          dark: 'hsl(40, 90%, 40%)'
        },
        success: {
          DEFAULT: 'hsl(140, 70%, 45%)',
          light: 'hsl(140, 70%, 90%)',
          dark: 'hsl(140, 70%, 30%)'
        },
        info: {
          DEFAULT: 'hsl(210, 70%, 50%)',
          light: 'hsl(210, 70%, 90%)',
          dark: 'hsl(210, 70%, 35%)'
        },
        // Gradient colors
        gradient: {
          start: 'hsl(230, 60%, 50%)',
          end: 'hsl(280, 60%, 45%)'
        }
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 20%, 10%, 0.1)',
        'card-dark': '0 4px 12px hsla(220, 20%, 5%, 0.3)',
        'elevated': '0 8px 16px hsla(220, 20%, 10%, 0.15)',
        'button': '0 2px 4px hsla(220, 20%, 10%, 0.1)',
      },
      spacing: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.16' }],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // Add plugin for focus-visible polyfill
    function({ addBase, theme }) {
      addBase({
        // Improved focus styles for better accessibility
        'a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible': {
          outline: 'none',
          boxShadow: `0 0 0 2px ${theme('colors.primary.DEFAULT')}, 0 0 0 4px rgba(59, 130, 246, 0.5)`,
        },
      });
    },
  ],
}
