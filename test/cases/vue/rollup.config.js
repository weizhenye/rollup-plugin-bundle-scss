import path from 'path';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import bundleScss from '../../../index.js';

export default {
  input: path.resolve(__dirname, 'App.vue'),
  output: {
    file: path.resolve(__dirname, 'dist/index.js'),
    format: 'esm',
  },
  plugins: [
    commonjs(),
    bundleScss(),
    vue(),
  ],
};
