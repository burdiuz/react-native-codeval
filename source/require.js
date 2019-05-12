import { resolvePackageName } from './resolvers';
import { isHelperPackageName, getFactoryByPackage } from './babel-helpers';
import { hasImportedModule, getImportedModule } from './imports';

/*
When looking for required module
1. go through all resolvers until one returns function, pass string as is to resolver
2. check helpers, skip if package name does not match
3. go through all registered modules
4. raise error
*/

export const getModuleFactory = (packageName) => {
  let factory = resolvePackageName(packageName);

  if (!factory && isHelperPackageName(packageName)) {
    factory = getFactoryByPackage(packageName);
  }

  if (!factory && hasImportedModule(packageName)) {
    factory = getImportedModule(packageName);
  }

  return factory || null;
};

export const requireOnce = (packageName) => {
  const factory = getModuleFactory(packageName);

  if (!factory) {
    throw new Error(`Tried to import unavailable module '${packageName}'.`);
  }

  return factory;
};

export const initCacheableRequire = (prepareCacheMapFn = null) => {
  const cache = new Map();

  if (prepareCacheMapFn) {
    prepareCacheMapFn(cache);
  }

  const cacheableRequire = (packageName) => {
    let factory = cache.get(packageName);

    if (!factory) {
      factory = requireOnce(packageName);

      cache.set(packageName, factory);
    }

    return factory();
  };

  cacheableRequire.cache = cache;

  cacheableRequire.require = cacheableRequire;

  return cacheableRequire;
};
