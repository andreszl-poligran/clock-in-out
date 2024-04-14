/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';

export default {
    content: [
        "index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            gridTemplateColumns: {
                '13': 'repeat(13, minmax(0, 1fr))'
            }
        }
    },
    plugins: [
        scrollbarPlugin,
    ],
}

