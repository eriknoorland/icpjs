import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import { dts } from 'rollup-plugin-dts';

const name = 'icpjs';
const outputFormats = [
  {
    file: `dist/${name}.umd.cjs`,
    format: 'umd',
    name,
  },
  {
    file: `dist/${name}.js`,
    format: 'es',
  },
  {
    file: `dist/${name}.cjs`,
    format: 'cjs',
  },
  {
    file: `dist/${name}.iife.js`,
    format: 'iife',
    name,
  },
];

export default [
  ...outputFormats.map(output => {
    return {
      input: 'src/icpjs.ts',
      output,
      plugins: [
        typescript({
          exclude: [
            '**/tests',
            '**/*.test.ts',
          ],
        }),
        terser(),
      ],
    };
  }),

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