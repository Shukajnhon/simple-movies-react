/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: "#F62682",
        secondary: "#6F5CF1",
      },
      keyframes: {
        slideDown: {
          "0%": {transform: "translateY(-100%)"},
          "100%": {transform: " translateY(0)"},
        },
        slideUp: {
          "0%": {transform: "translateY(100%)"},
          "100%": {transform: " translateY(0)"},
        },
      },
      animation: {
        slideDown: "slideDown 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-in-out",
      },
    },

    // breakpoint
    // screens: {
    // sm: "270px",
    // => @media (min-width: 370px) { ... }

    // md: "639",
    // => @media (min-width: 639px) { ... }

    // lg: "1440px",
    // => @media (min-width: 1440px) { ... }
    // },
  },
  plugins: [],
};
