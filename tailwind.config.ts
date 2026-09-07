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
          950: "#000000", // Pure Black
          900: "#0A0A0A", // Rich Luxury Black
          850: "#121212", // Deep Charcoal
          800: "#1A1A1A",
          700: "#2A2A2A",
          600: "#3F3F46",
          100: "#F4F4F5",
          50: "#FAFAFA",
        },
        gold: {
          50: "#FDFBF7",
          100: "#F9F5EC",
          200: "#F1E5CD",
          300: "#EAD49B",
          400: "#DEBF72",
          500: "#D4AF37", // Official Metallic Gold
          600: "#BA9528",
          700: "#9C791D",
          800: "#755B14",
          900: "#4D3B0A",
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
