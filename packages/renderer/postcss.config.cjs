/* eslint-disable @typescript-eslint/no-var-requires */
const postcssGlobalData = require('@csstools/postcss-global-data');
const postcssCustomMedia = require('postcss-custom-media');
const postcssNesting = require('postcss-nesting');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

module.exports = {
  plugins: [
    postcssGlobalData({
      files: [join(__dirname, './src/styles/media.css')]
    }),
    postcssCustomMedia(),
    autoprefixer(),
    cssnano(),
    postcssNesting()
  ]
};
