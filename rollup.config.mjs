import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts'

export default [
  {
    input: 'src/icpjs.ts',
    output: {
      file: 'dist/icpjs.js',
      format: 'umd',
      name: 'icpjs',
    },
    plugins: [
      typescript(),
      terser(),
    ],
  },
  {
    input: 'dist/dts/icpjs.d.ts',
    output: {
      file: 'dist/icpjs.d.ts',
      format: 'es',
    },
    plugins: [
      dts(),
    ],
  },
];