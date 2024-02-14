/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'heart-rgba': 'rgba(253, 37, 47, 0.3)',
      },
    },
  },
  plugins: [],
}

