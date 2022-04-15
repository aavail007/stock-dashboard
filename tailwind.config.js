module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        main: '#085E7D',
        secondary: '#FFD32D',
        secondary2: '#FFE61B',
        third: '#008E89',
        fourth: '#084594',
        sGreen: '#4bc0c0',
        sRed: '#ff6384',
        sGray: '#e6f0f9'
      }
    }
  },
  plugins: [require('tw-elements/dist/plugin')]
};
