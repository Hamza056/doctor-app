/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        textColor: "rgba(var(--textColor))",
        bgLogin: "rgba(var(--bgLogin))",
        bgLoginDark: "rgba(var(--bgLoginDark))",
        chartRainbow: "rgba(var(--chartRainbow))",
        redBg: "rgba(var(--redBg))",
        yellowBg: "rgba(var(--yellowBg))",
        blueBg: "rgba(var(--blueBg))",
        Graybg: "rgba(var(--greyBg))",
        bgCard: "rgba(var(--bgCard))",
      },
    },
  },
  plugins: [],
};
