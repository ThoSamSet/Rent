/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0e1420',
        dusk: '#28304a',
        alpenglow: '#e8a06b',
        ember: '#c1652f',
        snow: '#f4ede0',
        fog: '#9aa4b8',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'var(--font-be-vietnam-pro)', 'Georgia', 'serif'],
        sans: ['var(--font-be-vietnam-pro)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
