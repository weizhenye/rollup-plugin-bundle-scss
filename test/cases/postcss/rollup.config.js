import path from 'path';
import postcss from 'rollup-plugin-postcss';
import bundleScss from '../../../index.js';

export default {
  input: path.resolve(__dirname, 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'esm',
  },
  plugins: [
    bundleScss({ exclusive: false }),
    postcss({
      modules: {
        generateScopedName: '[hash]',
        localsConvention: 'camelCase',
      },
      minimize: true,
      extract: true,
    }),
  ],
};
