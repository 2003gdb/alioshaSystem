import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        big: ["var(--font-aldrich)", ...fontFamily.sans],
      },
      colors: {
        alioshaDark: "var(--alioshaBlack)",
        alioshaLight: "var(--alioshaWhite)",
        alioshaGray: "var(--alioshaGray)",
        alioshaRed: "var(--alioshaRed)",
        alioshaYellow: "var(--alioshaYellow)",
        alioshaBlue: "var(--alioshaBlue)",
        alioshaGreen: "var(--alioshaGreen)",
      },
    },
  },
  plugins: [],
};