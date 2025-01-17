/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {},
    },
    plugins: ["prettier-plugin-tailwindcss", require("tailwindcss-animate")],
};
