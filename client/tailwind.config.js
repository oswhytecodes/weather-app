/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        dayTime: "url('/images/bgDay.jpg)",
        nightTime: "url('/images/bgNight.png)",
      },
    },
  },
  plugins: [],
};
