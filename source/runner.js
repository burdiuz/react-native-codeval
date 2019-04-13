/* eslint-disable import/prefer-default-export */
import { getCurrentGlobals } from './globals';
import { initCacheableRequire } from './require';
import { transform } from './transform';
import { evaluate } from './evaluate';

export const initRunner = (customGlobals = {}, prepareCacheMap = null) => {
  const requireFn = initCacheableRequire(prepareCacheMap);

  return async (source, globals = {}, asyncPostTransformHandler = null) => {
    let currentRequireFn = requireFn;
    const code = await transform(source);

    if (asyncPostTransformHandler) {
      currentRequireFn = await asyncPostTransformHandler(code, requireFn);
    }

    return evaluate(code, {
      require: currentRequireFn,
      ...getCurrentGlobals(),
      ...customGlobals,
      ...globals,
    });
  };
};
