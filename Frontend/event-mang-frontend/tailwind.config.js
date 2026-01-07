import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentHover: 'rgb(var(--accent-hover) / <alpha-value>)',
        bgMain: 'rgb(var(--bg-main) / <alpha-value>)',
        bgCard: 'rgb(var(--bg-card) / <alpha-value>)',
        textMain: 'rgb(var(--text-main) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

// For Vite + Tailwind v4
export default [
  tailwindcss(config),
  autoprefixer,
];
