module.exports = {
  darkMode: 'class',
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#18181b',
        darkcard: '#232336',
        darktext: '#e5e7eb',
        darkborder: '#2d2d3a',
        darkprimary: '#2563eb',
      },
    },
  },
  plugins: [],
} 