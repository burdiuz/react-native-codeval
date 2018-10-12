import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export const DESTINATION_FOLDER = 'dist';

export const LIBRARY_FILE_NAME = 'codeval';
export const LIBRARY_VAR_NAME = 'Codeval';

export const plugins = [
  resolve({ preferBuiltins: false }),
  commonjs(),
  builtins(),
  globals(),
  json(),
];

export const cjsConfig = {
  input: 'source/index.js',
  output: [
    {
      file: 'index.js',
      sourcemap: true,
      exports: 'named',
      format: 'cjs',
    },
  ],
  plugins,
  external: ['@actualwave/closure-value'],
};

const makeUMDConfig = (suffix = '', additionalPlugins = []) => ({
  input: 'source/index.js',
  output: [
    {
      file: `${DESTINATION_FOLDER}/${LIBRARY_FILE_NAME}${suffix}.js`,
      sourcemap: true,
      exports: 'named',
      name: LIBRARY_VAR_NAME,
      format: 'umd',
    },
  ],
  plugins: [...plugins, ...additionalPlugins],
});

export const umdConfig = makeUMDConfig();

export const umdMinConfig = makeUMDConfig('.min', [terser()]);
