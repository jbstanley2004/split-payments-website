/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#141413',
        light: '#faf9f5',
        'mid-gray': '#b0aea5',
        'light-gray': '#e8e6dc',
        orange: '#d97757',
        blue: '#6a9bcc',
        green: '#788c5d',
        purple: '#a9a1b3', // Muted lavender from screenshot
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      borderRadius: {
        pill: '9999px',
        card: '28px',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}