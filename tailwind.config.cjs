module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        title: ['"DM Sans"', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        17: '4.25rem',
        21: '5.25rem',
      },
      colors: {
        brand: {
          DEFAULT: '#657620',
          soft: '#849B3A',
          pale: '#C5D48A',
          muted: '#A3B55C',
          dark: '#3F4A14',
        },
        // Or / gold
        honey: {
          DEFAULT: '#EFBD21',
          soft: '#F5D15A',
          pale: '#F9E39A',
          dark: '#B89010',
        },
        // Corail
        moss: {
          DEFAULT: '#F58C76',
          soft: '#F8A998',
          pale: '#FCD0C6',
          dark: '#D46B55',
        },
        site: {
          DEFAULT: '#FAF8F3',
          raised: '#F5F2EB',
          elevated: '#F0ECE4',
        },
        ink: {
          DEFAULT: '#2C2A26',
          muted: '#6B6560',
          faint: '#9A9288',
        },
      },
    },
  },
  plugins: [],
}
