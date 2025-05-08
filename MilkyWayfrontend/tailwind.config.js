/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "1/15": "6.666667%", // 100%의 1/15
      },
    },
  },
  plugins: [],
};
