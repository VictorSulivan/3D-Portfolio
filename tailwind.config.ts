import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          canvas: "#010409",
          bg: "#0d1117",
          surface: "#161b22",
          border: "#30363d",
          muted: "#8b949e",
          text: "#e6edf3",
          subtle: "#c9d1d9",
          hover: "#21262d",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        atmosphere:
          "radial-gradient(900px 480px at 15% -5%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(700px 400px at 90% 10%, rgba(255,255,255,0.03), transparent 50%), linear-gradient(180deg, #010409 0%, #0d1117 55%, #010409 100%)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.7s ease-out both",
        "rise-delay": "rise 0.8s ease-out 0.12s both",
        "rise-late": "rise 0.9s ease-out 0.22s both",
        blink: "blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
