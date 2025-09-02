/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 20%, 98%)',
        accent: 'hsl(140, 70%, 50%)',
        primary: 'hsl(210, 70%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 25%, 15%)',
        'text-secondary': 'hsl(220, 20%, 40%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 20%, 10%, 0.1)',
      },
      spacing: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
      },
    },
  },
  plugins: [],
}