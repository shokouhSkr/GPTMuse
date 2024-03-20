import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#f8fafc",
          secondary: "#1a1b1e",
          accent: "#37cdbe",
          neutral: "#f0f2f6",
          "base-100": "#ffffff",
        },
      },
      {
        dark: {
          primary: "#1a1b1e",
          secondary: "#fff",
          accent: "#37cdbe",
          neutral: "#3a3a3d",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
export default config;
