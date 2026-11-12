import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#06080B",
          900: "#0B0F14",
          850: "#0F141C",
          800: "#131922",
          700: "#1A2330",
          600: "#243042",
        },
        slateBorder: {
          dark: "#1F2937",
          light: "#E2E8F0",
        },
        amberGold: {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
          muted: "rgba(245, 158, 11, 0.15)",
        },
        emeraldTeal: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
          muted: "rgba(16, 185, 129, 0.15)",
        },
        coralRose: {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          dark: "#E11D48",
          muted: "rgba(244, 63, 94, 0.15)",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scanline 2s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
