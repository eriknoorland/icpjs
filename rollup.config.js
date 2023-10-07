import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const config = {
  input: 'index.js',
  output: {
    file: `dist/${pkg.name}.min.js`,
    format: 'umd',
    name: pkg.name,
  },
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'bundled',
    }),
    terser(),
  ],
};

export default config;