/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const scrollbarHide = require("tailwind-scrollbar-hide");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
};
