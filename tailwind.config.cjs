/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        highlight: "#915eff",
        active: "#6022e6",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
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
