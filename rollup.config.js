import babel from '@rollup/plugin-babel';
import externals from 'rollup-plugin-node-externals';
import package_ from './package.json';

const plugins = [
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }),
];

export default [
  {
    input: package_.source,
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
    plugins: [externals({ deps: true }), ...plugins],
  },
];
