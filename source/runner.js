/* eslint-disable import/prefer-default-export */
import { getCurrentGlobals } from './globals';
import { initCacheableRequire } from './require';
import { transform } from './transform';
import { evaluate } from './evaluate';

export const initRunner = (customGlobals = {}) => {
  const require = initCacheableRequire();

  return (source, globals = {}) =>
    new Promise((resolve, reject) => {
      transform(source)
        .then((code) => {
          const result = evaluate(code, {
            require,
            ...getCurrentGlobals(),
            ...customGlobals,
            ...globals,
          });

          resolve(result);
        })
        .catch(reject);
    });
};
