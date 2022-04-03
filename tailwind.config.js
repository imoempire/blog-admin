module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
        bottom: 'bottom',
      }
    },
  },
  plugins: [],
}
