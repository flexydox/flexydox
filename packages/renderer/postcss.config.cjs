/* eslint-disable @typescript-eslint/no-var-requires */

const postcssNesting = require('postcss-nesting');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

module.exports = {
  plugins: [autoprefixer(), cssnano(), postcssNesting()]
};
