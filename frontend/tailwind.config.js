/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        input:
          "0 -1px 0 hsla(0, 0%, 100%, 0.15), inset 0 2px 2px hsla(0, 0%, 0%, 0.1)",
      },
    },
  },
  plugins: [],
};
