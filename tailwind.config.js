/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: '#FDFDFD',
          text: '#161615',
          highlight: '#5751D5',
        }
      },
      backgroundImage: {
        'aurora-gradient': 'conic-gradient(from 120deg at 50% 50%, #5751D5 0%, #A5B4FC 60%, #FDFDFD 100%)',
      }
    },
  },
  plugins: [],
}
