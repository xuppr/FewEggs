/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "250px": "250px",
        "294px": "294px",
      },
      height: {
        "250px": "250px",
        "294px": "294px",
      },
      boxShadow: {
        "3xl": "0 12px 99px -37px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
