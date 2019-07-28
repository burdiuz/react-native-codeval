/* eslint-disable import/prefer-default-export */
import { getCurrentGlobals } from './globals';
import { initCacheableRequire } from './require';
import { transform } from './transform';
import { evaluate } from './evaluate';

export const initRunner = (customGlobals = {}, prepareCacheMapFn = null) => {
  const requireFn = initCacheableRequire(prepareCacheMapFn);

  return async (
    source,
    globals = {},
    asyncPostTransformHandler = null,
    skipTransform = false,
    filename = undefined,
  ) => {
    let currentRequireFn = requireFn;
    const code = skipTransform ? source : await transform(source, filename);

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
