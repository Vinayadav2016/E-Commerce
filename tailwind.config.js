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
        "exit-left": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-200%) ", opacity: 0 },
        },
      },
      animation: {
        "slide-in": "slide-in 1.5s ease-in-out",
        "exit-left": "exit-left 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
