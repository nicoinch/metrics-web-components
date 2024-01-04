/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './.storybook/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: { primary: colors.indigo, secondary: colors.amber, ...colors },
    },
    plugins: [],
};
