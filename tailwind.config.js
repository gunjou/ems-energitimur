/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    "bg-et-yellow",
    "bg-et-green",
    "bg-et-blue",
    "bg-blue-500",
    "bg-red-500",
  ],
  theme: {
    extend: {
      colors: {
        "et-blue": "#2B5797",
        "et-green": "#438241",
        "et-yellow": "#FBC02D",
        "et-light": "#F8FAFC",
        "et-dark": "#1E293B",
      },
    },
  },
  plugins: [],
};
