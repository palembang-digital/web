/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const baseTheme = require('./base.theme');

/**
 * @see https://daisyui.com/docs/config/
 */
module.exports = {
  prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  logs: false,
  themes: [
    {
      light: baseTheme
    }
  ]
};
