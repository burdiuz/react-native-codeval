/* eslint-disable import/prefer-default-export */
import { createGlobalObject } from './globals';
import { initCacheableRequire } from './require';
import { transform } from './transform';
import { evaluate } from './evaluate';

export const initRunner = (sharedGlobals = {}, prepareCacheMapFn = null) => {
  const requireFn = initCacheableRequire(prepareCacheMapFn);

  return async (
    source,
    customGlobals = {},
    asyncPostTransformHandler = null,
    skipTransform = false,
    filename = undefined,
  ) => {
    let currentRequireFn = requireFn;
    const code = skipTransform ? source : await transform(source, filename);

    if (asyncPostTransformHandler) {
      currentRequireFn = await asyncPostTransformHandler(code, requireFn);
    }

    const globals = createGlobalObject(
      {
        require: currentRequireFn,
      },
      sharedGlobals,
      customGlobals,
    );

    return evaluate(code, globals);
  };
};
