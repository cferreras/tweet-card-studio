import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f1419",
        muted: "#637685",
        rule: "#e7edf2",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Geist",
          "SF Pro Text",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
