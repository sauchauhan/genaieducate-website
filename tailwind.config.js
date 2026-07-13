/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1E5C4A",
        terracotta: "#C94F1E",
        cream: "#FFF8F0",
        dark: "#2A2A2A",
        lightgray: "#F5F5F5",
      },
      fontFamily: {
        heading: ["Georgia", "Lora", "ui-serif", "Georgia", "serif"],
        body: ["Calibri", "DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Consolas", "ui-monospace", "SFMono-Regular", "monospace"],
        // The GenAI Brief typography. Variables are set by
        // app/this-week-in-ai/layout.js via next/font.
        "brief-serif": ["var(--font-brief-serif)", "Lora", "Georgia", "serif"],
        "brief-sans": ["var(--font-brief-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        "brief-mono": ["var(--font-brief-mono)", "Consolas", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
}