import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          50: "var(--color-50)",
          100: "var(--color-100)",
          200: "var(--color-200)",
          300: "var(--color-300)",
          400: "var(--color-400)",
          500: "var(--color-500)",
          600: "var(--color-600)",
          700: "var(--color-700)",
          800: "var(--color-800)",
          900: "var(--color-900)",
        },
        zinc: {
          50: "var(--zinc-50)",
          100: "var(--zinc-100)",
          200: "var(--zinc-200)",
          300: "var(--zinc-300)",
          400: "var(--zinc-400)",
          500: "var(--zinc-500)",
          600: "var(--zinc-600)",
          700: "var(--zinc-700)",
          800: "var(--zinc-800)",
          900: "var(--zinc-900)",
        },
        white: "var(--white)",
        black: "var(--black)",
      },
    },
  },
  plugins: [],
  safelist: [
    "react-datepicker",
    "react-datepicker__header",
    "react-datepicker__day",
    "react-datepicker__day-name",
    "react-datepicker__day--disabled",
    "react-datepicker__day--selected",
    "react-datepicker__day--today",
    "react-datepicker__day--keyboard-selected",
  ],
} satisfies Config;
