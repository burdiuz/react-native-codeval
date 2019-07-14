import * as babel from '@babel/standalone';
import preset from 'metro-react-native-babel-preset';
import decoratorsPlugin from '@babel/plugin-proposal-decorators';
import graphqlTagPlugin from 'babel-plugin-graphql-tag';

/*
import externalHelpers from '@babel/plugin-external-helpers';
babel.registerPlugin('external-helpers', externalHelpers);
*/

babel.registerPreset('metro-react-native-babel-preset', preset);
babel.registerPlugin('@babel/plugin-proposal-decorators', decoratorsPlugin);
babel.registerPlugin('babel-plugin-graphql-tag', graphqlTagPlugin);

export const defaultConfig = {
  comments: false,
  compact: false,
  retainLines: true,
  ast: false,
  code: true,
  presets: ['metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    'babel-plugin-graphql-tag',
  ],
};

/**
 FIXME use babel config and utilize ENV settings
 retainLines
*/
const transform = (input, filename = 'index.js', config = {}) =>
  new Promise((resolve, reject) => {
    const syncResult = babel.transform(
      input,
      { filename, ...defaultConfig, ...config },
      (error, result) => {
        if (syncResult) {
          return;
        }

        if (error) {
          reject(error);
        } else {
          const { code /* , map, ast */ } = result;

          resolve(code);
        }
      },
    );

    if (syncResult && syncResult.code) {
      resolve(syncResult.code);
    } else {
      reject(syncResult);
    }
  });

export { babel, preset, transform };

export default transform;
