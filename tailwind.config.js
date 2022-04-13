module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        main: '#22577E',
        secondary: '#95D1CC',
        third: '#FAFFAF',
        fourth: '#214594',
        sGreen: '#4bc0c0',
        sRed: '#ff6384'
      }
    }
  },
  plugins: [require('tw-elements/dist/plugin')]
};
