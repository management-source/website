import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        knight: {
          950: "#060e1a",
          900: "#0A192F",
          850: "#0d233f",
          800: "#102A43",
          700: "#1E3E62",
          600: "#2B5278",
          100: "#E3EBF3",
          50: "#F0F5FA",
        },
        gold: {
          50: "#FDFBF7",
          100: "#F9F5EC",
          200: "#F1E5CD",
          300: "#E6D1A8",
          400: "#D8BC83",
          500: "#C5A880",
          600: "#B89358",
          700: "#9C7942",
          800: "#7F6235",
          900: "#5D4726",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

