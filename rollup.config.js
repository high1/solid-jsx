import babel from '@rollup/plugin-babel';
import solid from 'babel-preset-solid';
import typescript from '@babel/preset-typescript';
import package_ from './package.json';

export default [
  {
    input: package_.source,
    external: ['solid-js', 'solid-js/web'],
    output: [
      {
        format: 'esm',
        file: package_.module,
        sourcemap: true,
      },
      {
        format: 'cjs',
        file: package_.main,
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [solid, typescript],
      }),
    ],
  },
];
