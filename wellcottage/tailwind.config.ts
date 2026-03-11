import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: "#f7f6f0",
          100: "#edecd8",
          200: "#d8d5ad",
          300: "#c0bb80",
          400: "#aaa258",
          500: "#8d8840",
          600: "#6e6b30",
          700: "#565428",
          800: "#464524",
          900: "#3c3b22",
        },
        sage: {
          50: "#f4f7f2",
          100: "#e2ead9",
          200: "#c4d5b4",
          300: "#9db888",
          400: "#7a9b64",
          500: "#5c7e47",
          600: "#466437",
          700: "#38502d",
          800: "#2e4026",
          900: "#273721",
        },
        cream: {
          50: "#fdfdf8",
          100: "#f8f5e8",
          200: "#f0eacb",
          300: "#e5d9a3",
          400: "#d6c372",
          500: "#c7ad4a",
          600: "#b09239",
          700: "#8e722f",
          800: "#745c2b",
          900: "#614d27",
        },
        earth: {
          50: "#f9f5f0",
          100: "#f0e8d8",
          200: "#deccaf",
          300: "#c8a97e",
          400: "#b58757",
          500: "#a37040",
          600: "#8a5b35",
          700: "#70482d",
          800: "#5c3c28",
          900: "#4d3324",
        },
        wood: {
          light: "#d4b483",
          medium: "#b8955a",
          dark: "#7a5c3a",
          walnut: "#4a3020",
        },
        background: "#f5f1ea",
        foreground: "#2c2415",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
