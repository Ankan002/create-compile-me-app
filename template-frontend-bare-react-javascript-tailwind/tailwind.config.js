/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-light": "#fff3e2",
                "primary-dark": "#2d2727",
                "primary-yellow": "#fec868",
                "primary-grey": "#454545",
            },
            fontFamily: {
                manrope: "'Manrope', sans-serif",
            },
        },
    },
    plugins: [],
};
