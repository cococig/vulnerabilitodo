const {iconsPlugin, getIconCollections} = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),iconsPlugin({
    collections: getIconCollections(["flowbite"])
  })],
}

