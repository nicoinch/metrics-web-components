/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './.storybook/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            primary: colors.red,
            'default-text': 'rgb(var(--color-default-text) / <alpha-value>)',
            'default-bg': 'rgb(var(--color-default-bg) / <alpha-value>)',
            'primary-text': 'rgb(var(--color-primary-text) / <alpha-value>)',
            'primary-content-bg': 'rgb(var(--color-primary-content-bg) / <alpha-value>)',
            'primary-content-bg-hover': 'rgb(var(--color-primary-content-bg-hover) / <alpha-value>)',
            'primary-focus': 'rgb(var(--color-primary-focus) / <alpha-value>)',
            secondary: colors.amber,
            ...colors,
        },
    },
    plugins: [],
};
