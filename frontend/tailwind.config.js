/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF0000", // Custom primary color
        secondary: "#00FF00", // Custom secondary color
        customGray: "#333333",
        brandPrimary: "#1e90ff",
        brandSecondary: "#4fd1c5",
      },
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
