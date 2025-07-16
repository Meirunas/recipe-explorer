/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',   // ← use “class”-based dark mode
  content: [
    './index.html',           // your HTML shell
    './src/**/*.{vue,js,ts}', // all Vue and JS/TS files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
