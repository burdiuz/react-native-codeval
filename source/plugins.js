import { valuesSetFactory } from '@actualwave/closure-value';

const {
  values,
  delete: removeTranspilerPlugin,
  has: hasTranspilerPlugin,
  add: addTranspilerPlugin,
} = valuesSetFactory();

export const setTranspilerPlugins = (list) => {
  values.clear();

  list.forEach((item) => values.add(item));
};

export const getTranspilerPlugins = () => Array.from(values);

export { removeTranspilerPlugin, hasTranspilerPlugin, addTranspilerPlugin };
