import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07110f",
          900: "#0c1a16",
          800: "#132822",
          700: "#1c3a31",
        },
        moss: {
          400: "#6f9f7e",
          500: "#4f7d5f",
          600: "#3a5f48",
        },
        brass: {
          300: "#e0c584",
          400: "#c9a45c",
          500: "#a9843f",
        },
        mist: {
          50: "#f3f6f4",
          100: "#e4ebe7",
          200: "#c5d3cc",
          400: "#8aa397",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        atmosphere:
          "radial-gradient(1200px 600px at 12% -10%, rgba(111, 159, 126, 0.28), transparent 55%), radial-gradient(900px 500px at 88% 8%, rgba(201, 164, 92, 0.18), transparent 50%), linear-gradient(165deg, #07110f 0%, #0c1a16 42%, #132822 100%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        rise: "rise 0.9s ease-out both",
        "rise-delay": "rise 1s ease-out 0.15s both",
        "rise-late": "rise 1.1s ease-out 0.3s both",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
