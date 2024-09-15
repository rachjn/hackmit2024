/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      grot: ["neue-haas-grotesk-display", "sans-serif"],
      area: ["area-normal", "sans-serif"],
      area2: ["area-extended", "sans-serif"],
      artic: ["articulat-cf", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "dark-green": "#14390C",
        "yellow-green": "#878D06",
        "light-beige": "#e3dbc5",
        "lightest-green": "#f5f3f0",
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "flip-up": {
          "0%": { transform: "rotateX(90deg)", opacity: 0 },
          "100%": { transform: "rotateX(0)", opacity: 1 },
        },
        "flip-down": {
          "0%": { transform: "rotateX(0)", opacity: 1 },
          "100%": { transform: "rotateX(90deg)", opacity: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flip-up": "flip-up 0.5s ease forwards",
        "flip-down": "flip-down 0.5s ease forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
