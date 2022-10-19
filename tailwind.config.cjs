/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        backgroundLight: "#ecf0f3",
        textLight: "#686868",
        headingLight: "#7b81be",
        accentLight: "#6b92e5",
        backgroundDark: "#2c3035",
        textDark: "#acacac",
        headingsDark: "#0f5e77",
        accentDark: "#d7cf6e",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
