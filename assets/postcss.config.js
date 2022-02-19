const path = require('path');

module.exports = () => ({
  plugins: {
    tailwindcss: {
      config: path.resolve('assets/tailwind.config.js'),
    },
    autoprefixer: {},
  },
});
