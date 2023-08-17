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
      },
      fontFamily:{
        'MuseoModerno': ['MuseoModerno'] ,
        'Roboto': [ "Roboto", "Arial", "sans-serif"],
      },
      boxShadow:{
        'top-md':[
                  "--tw-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1); --tw-shadow-colored: 0 -4px 6px -1px var(--tw-shadow-color), 0 -2px 4px -2px var(--tw-shadow-color); box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);",
        ]
      }
    },
  },
  plugins: [],
}

