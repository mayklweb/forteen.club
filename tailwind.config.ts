import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: { fade: { from: { opacity: "0", transform: "scale(1.05)" }, to: { opacity: "1", transform: "scale(1)" } } },
      colors: { ink: "#080808", paper: "#F1F0EB", mute: "#8B8B86", accent: "#D4FF3A" },
      fontFamily: { sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"], serif: ["var(--font-serif)", "Georgia", "serif"] },
    },
  },
  plugins: [],
} satisfies Config;
