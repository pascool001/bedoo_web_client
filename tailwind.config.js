/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js", // add this line,
    "./src/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth': "url('./src/assets/authimg.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // add this line
  ],
}

