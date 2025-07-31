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
          50: '#e6f2ff',
          100: '#b3d9ff',
          200: '#80c0ff',
          300: '#4da6ff',
          400: '#1a8dff',
          500: '#007bff',
          600: '#0056b3',
          700: '#003d80',
          800: '#002a59',
          900: '#001733',
        },
        navy: {
          50: '#e8f0f5',
          100: '#c5d9e8',
          200: '#a1c2da',
          300: '#7eabcd',
          400: '#5a94c0',
          500: '#1e3a5f',
          600: '#1a324f',
          700: '#15293f',
          800: '#11212f',
          900: '#0c181f',
        },
        amber: {
          50: '#fef9e7',
          100: '#fdf2c4',
          200: '#fceb9f',
          300: '#fbe479',
          400: '#fade53',
          500: '#f39c12',
          600: '#d68910',
          700: '#b9760e',
          800: '#9c630c',
          900: '#7f500a',
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}