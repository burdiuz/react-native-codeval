import * as babel from '@babel/core';

/*
  Babel tries to load package.json even when global and per-file configs are disabled(uses fs.existsSync(), fs.statSync(), etc.).
  Since react-native-level-fs does not implements *Sync functions from node's fs, this causes errors.
  So, I've added dummies for existsSync() and statSync() just to work-around this error.
*/
const fs = require('react-native-level-fs');
fs.default = fs.default || fs;

fs.default.existsSync = fs.default.existsSync || (() => false);
fs.default.statSync =
  fs.default.statSync ||
  (() => {
    const error = new Error(
      'statSync() function does not exist in react-native-level-fs and is mocked to work with @babel/core which desperately tries to load package.json.',
    );
    error.code = 'ENOENT';

    throw error;
  });

const defaultPresets = [require('metro-react-native-babel-preset')];

const defaultPlugins = [];

const defaultConfig = {
  comments: false,
  compact: false,
  retainLines: true,
  ast: false,
  code: true,
  configFile: false,
  babelrc: false,
  babelrcRoots: false,
};

/**
 FIXME use babel config and utilize ENV settings
 retainLines
*/
const transform = (input, filename = 'index.js', { presets = [], plugins = [], ...config } = {}) =>
  babel
    .transformAsync(input, {
      filename,
      ...defaultConfig,
      ...config,
      presets: [...defaultPresets, ...presets],
      plugins: [...defaultPlugins, ...plugins],
    })
    .then((result) => {
      if (!result || !result.code) {
        return Promise.reject(result);
      }

      return result.code;
    });

export { babel, transform };

export default transform;
