/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0F1C",
        surface: "#111827",
        surfaceLight: "#1F2937",

        primary: "#058DE8",
        primaryHover: "#0284C7",

        accent: "#22D3EE",

        textPrimary: "#FFFFFF",
        textSecondary: "#9CA3AF",
      },
      boxShadow: {
        glow: "0 0 20px rgba(5, 141, 232, 0.5)",
      },
    },
  },
  plugins: [],
}