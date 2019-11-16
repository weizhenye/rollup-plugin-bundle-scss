import path from 'path';
import bundleScss from '../../../index.js';

export default {
  input: path.resolve(__dirname, 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'esm',
  },
  plugins: [
    bundleScss({ output: 'custom.scss' }),
  ],
};
