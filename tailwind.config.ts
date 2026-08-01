import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          50: "#fef7f0",
          100: "#fdecd9",
          200: "#fbd6b3",
          300: "#f8b97d",
          400: "#f59340",
          500: "#f37b20",
          600: "#e26d10",
          700: "#bb5911",
          800: "#974912",
          900: "#7b3d13",
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
