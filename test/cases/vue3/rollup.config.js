import path from 'path';
import vue from 'rollup-plugin-vue6';
import bundleScss from '../../../index.js';

export default {
  input: path.resolve(__dirname, 'App.vue'),
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'esm',
  },
  plugins: [
    vue(),
    bundleScss(),
  ],
};
