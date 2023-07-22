/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "custom-blue-500" : "#0F1B8A",
        "custom-blue-400" : "#3F52B3",
        "custom-blue-300" : "#5E79D1",
        "custom-blue-200" : "#A5B0D8",
        "custom-blue-100" : "#E0E5F8",
      }
    },
  },
  plugins: [],
}

