/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        123: "27rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
