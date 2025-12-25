/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ad',
          300: '#f6bb79',
          400: '#f19543',
          500: '#ed7620',
          600: '#de5c16',
          700: '#b84514',
          800: '#933818',
          900: '#773016',
        },
        warm: {
          50: '#fdfaf6',
          100: '#faf3e8',
          200: '#f5e6d0',
          300: '#edd4ae',
          400: '#e3bc86',
          500: '#d9a366',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


