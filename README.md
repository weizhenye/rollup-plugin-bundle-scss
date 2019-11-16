# rollup-plugin-bundle-scss

[![Node version](https://badgen.net/npm/node/rollup-plugin-bundle-scss?icon=https://simpleicons.now.sh/node-dot-js/fff)](https://nodejs.org)
[![NPM version](https://badgen.net/npm/v/rollup-plugin-bundle-scss?icon=npm)](https://www.npmjs.com/package/rollup-plugin-bundle-scss)
[![License](https://badgen.net/npm/license/rollup-plugin-bundle-scss?icon=https://api.iconify.design/octicon:law.svg?color=white)](https://github.com/weizhenye/rollup-plugin-bundle-scss/blob/master/LICENSE)

**WIP**

Rollup .scss imports into one bundled .scss file. Supports .vue files.

Maybe you're writing an UI library with SCSS for styles, and you want to bundle all styles in components into one .scss file, so that users can import it and do some custom theming. That's it.

## Installation

```bash
npm install -D rollup-plugin-bundle-scss
```

## Usage

```js
import bundleScss from 'rollup-plugin-bundle-scss';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    // output to dist/index.scss
    bundleScss(),
    // output to dist/foo.scss
    // bundleScss({ output: 'foo.scss' }),
  ],
};
```

Using with [rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue):

```js
import bundleScss from 'rollup-plugin-bundle-scss';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/App.vue',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    // required by rollup-plugin-vue
    commonjs(),
    // put it before vue()
    bundleScss(),
    vue(),
  ],
};
```
