/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1E5C4A",
        terracotta: "#C94F1E",
        cream: "#FFF8F0",
      },
      fontFamily: {
        heading: ["Georgia", "ui-serif", "Georgia", "serif"],
        body: ["Calibri", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}