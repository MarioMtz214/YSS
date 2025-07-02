/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    './src/index.html',
  ],
  theme: {
    extend: {
      colors: {
        yssY1: '#DBDA17',   // Color principal
        yssR1: '#FF5100',  // Color secundario
      },
    },
  },
  plugins: [],
}

