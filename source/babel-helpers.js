import * as babel from '@babel/core';

import { addImportedModule } from './imports';

// async/await support
addImportedModule('@babel/runtime/regenerator', () => require('@babel/runtime/regenerator'));

const HELPER_PACKAGE = '@babel/runtime/helpers/';
const PACKAGE_NAME_LENGTH = HELPER_PACKAGE.length;

export const isHelperPackageName = (name) => name.indexOf(HELPER_PACKAGE) === 0;

export const getHelperNameFromPackage = (packageName) => packageName.substr(PACKAGE_NAME_LENGTH);

export const generateHelpers = () => {
  const global = {};

  eval(babel.buildExternalHelpers());

  return global.babelHelpers;
};

export const initHelpers = () => {
  const helpers = generateHelpers();

  const get = (name) => () => helpers[name];
  const has = (name) => name in helpers;

  return {
    get,
    has,
    hasByPackage: (packageName) => has(getHelperNameFromPackage(packageName)),
    getFactoryByPackage: (packageName) => get(getHelperNameFromPackage(packageName)),
  };
};

export const { get: getHelper, has: hasHelper, hasByPackage, getFactoryByPackage } = initHelpers();
