module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Made Tommy"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        17: '4.25rem',
        21: '5.25rem',
      },
      colors: {
        brand: {
          DEFAULT: '#ae86fb',
          pale: '#f7eeee',
        },
        ochre: {
          DEFAULT: '#C4A35A',
          light: '#D4B86A',
          soft: '#E8D5A3',
        },
        paleGreen: {
          DEFAULT: '#A8C5A0',
          soft: '#C5D9BF',
        },
        terracotta: {
          DEFAULT: '#F97316',
          soft: '#FB923C',
          deep: '#EA580C',
        },
      },
    },
  },
  plugins: [],
}


