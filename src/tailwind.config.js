/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          200: "#bef264",
          300: "#a3e635",
          400: "#84cc16",
          500: "#65a30d",
        },
      },
    },
  },
  plugins: [],
};
