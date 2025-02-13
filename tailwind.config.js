/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,tsx,ts,jsx}',"./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
         primary: "#8E44AD", // Purple accent for highlighted elements
        'secondary-flow': "#2980B9", // Blue accent for selected categories
        background: "#2C3E50", // Dark background color
      buttonText: "#ECF0F1", // Light gray for button text
      border: "#34495E", // Slightly lighter border color
      buttonHover: "#9B59B6", // Lighter purple for button hover
        secondary: {
          100: '#E2E2D5',
          200: '#888883',
        }
      }
    },
  },
  plugins: [],
}

