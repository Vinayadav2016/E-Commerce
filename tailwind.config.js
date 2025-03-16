/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(10%)" },
          "70%": { transform: "translateY(-3%)" },
          "100%": { transform: "translateY(0)" },
        },
        "reduce-width": {
          from: {
            width: "100%",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 1.5s ease-in-out",
        "reduce-width": "reduce-width 4s ease-in-out",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
