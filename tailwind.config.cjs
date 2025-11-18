/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-bg) / <alpha-value>)",
        secondary: "rgb(var(--color-text-muted) / <alpha-value>)",
        tertiary: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        ink: "rgb(var(--color-text-strong) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        "accent-2": "rgb(var(--color-accent-2) / <alpha-value>)",
        highlight: "rgb(var(--color-highlight) / <alpha-value>)",
        active: "rgb(var(--color-accent-2) / <alpha-value>)",
      },
      boxShadow: {
        card: "0 24px 70px -30px rgba(15, 23, 42, 0.45)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "blue-pink-gradient":
          "linear-gradient(to bottom right, #6366f1, #a855f7 60%, #ec4899)",
        "pink-blue-gradient":
          "linear-gradient(to bottom right, #ec4899, #a855f7 60%, #6366f1)",
        "pink-pink-gradient":
          "linear-gradient(99deg, #DC4BAF 5.49%, #6366F1 37.16%, #A855F7 65.73%, #EC4899 100%)",
      },
    },
  },
  plugins: [],
};
