import { valuesSetFactory } from '@actualwave/closure-value';

const {
  values,
  delete: removePackageResolver,
  has: hasPackageResolver,
  add: addPackageResolver,
} = valuesSetFactory();

export const resolvePackageName = (packageName) => {
  for (const resolver of values) {
    const factory = resolver(packageName);

    if (factory) return factory;
  }

  return null;
};

export { removePackageResolver, hasPackageResolver, addPackageResolver };
