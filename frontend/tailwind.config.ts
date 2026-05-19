import { type Config } from "tailwindcss";

const config: Config = {
  // Use the class strategy so toggling `document.documentElement.classList.toggle('dark')`
  // will control dark mode instead of the system preference.
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

