import { valuesMapFactory } from '@actualwave/closure-value';
import isFunction from '@actualwave/is-function';

const {
	values,
	get: getImportedModule,
	set: addImportedModule,
	has: hasImportedModule,
	delete: removeImportedModule,
} = valuesMapFactory();

const listImportedModules = () => {
	return Array.from(values.keys());
};

const addImportedModules = (hash) =>
	Object.keys(hash).forEach((name) => {
		const fn = hash[name];
		if (!isFunction(fn)) {
			throw new Error('Imported Module must be a factory function.');
		}

		addImportedModule(name, fn);
	});

/* FIXME allow to import latest app version or its history items marked as "permanent".
export const resolveName = (name, getState) => {
  match = name.match(/([^@]+)(?:@([^@]+))?/);
  if (match) {
    [, appName, appVersion] = match;
    const app = getState().items.list.find((item) => appName === item.title);
    if (app) {
      if (appVersion) {
        const historyItem = app.history.find((item) => appVersion === item.title);
        if (historyItem) {
          return historyItem.item.content;
        } else {
          throw new Error(`Specific app version ${appName}@${appVersion} not found.`);
        }
      } else {
        return app.content;
      }
    } else {
      throw new Error(`App with ${appName} name not found.`);
    }
  }
  throw new Error('Cannot parse app name import.');
};
*/

addImportedModules({
	'@babel/core': () => require('@babel/core'),
	'@babel/generator': () => require('@babel/generator'),
	'@babel/helper-annotate-as-pure': () => require('@babel/helper-annotate-as-pure'),
	'@babel/helper-builder-binary-assignment-operator-visitor': () =>
		require('@babel/helper-builder-binary-assignment-operator-visitor'),
	'@babel/helper-call-delegate': () => require('@babel/helper-call-delegate'),
	'@babel/helper-create-class-features-plugin': () => require('@babel/helper-create-class-features-plugin'),
	'@babel/helper-create-regexp-features-plugin': () => require('@babel/helper-create-regexp-features-plugin'),
	'@babel/helper-define-map': () => require('@babel/helper-define-map'),
	'@babel/helper-explode-assignable-expression': () => require('@babel/helper-explode-assignable-expression'),
	'@babel/helper-function-name': () => require('@babel/helper-function-name'),
	'@babel/helper-get-function-arity': () => require('@babel/helper-get-function-arity'),
	'@babel/helper-hoist-variables': () => require('@babel/helper-hoist-variables'),
	'@babel/helper-member-expression-to-functions': () => require('@babel/helper-member-expression-to-functions'),
	'@babel/helper-module-imports': () => require('@babel/helper-module-imports'),
	'@babel/helper-module-transforms': () => require('@babel/helper-module-transforms'),
	'@babel/helper-optimise-call-expression': () => require('@babel/helper-optimise-call-expression'),
	'@babel/helper-plugin-utils': () => require('@babel/helper-plugin-utils'),
	'@babel/helper-regex': () => require('@babel/helper-regex'),
	'@babel/helper-remap-async-to-generator': () => require('@babel/helper-remap-async-to-generator'),
	'@babel/helper-replace-supers': () => require('@babel/helper-replace-supers'),
	'@babel/helper-simple-access': () => require('@babel/helper-simple-access'),
	'@babel/helper-split-export-declaration': () => require('@babel/helper-split-export-declaration'),
	'@babel/helper-wrap-function': () => require('@babel/helper-wrap-function'),
	'@babel/helpers': () => require('@babel/helpers'),
	'@babel/parser': () => require('@babel/parser'),
	'@babel/plugin-external-helpers': () => require('@babel/plugin-external-helpers'),
	'@babel/types': () => require('@babel/types'),
	'babel-literal-to-ast': () => require('babel-literal-to-ast'),
	'babel-plugin-transform-es2015-modules-commonjs': () => require('babel-plugin-transform-es2015-modules-commonjs'),
	'core-js': () => require('core-js'),

	// @babel/runtime submodules
	'@babel/runtime/regenerator': () => require('@babel/runtime/regenerator'),
	'@babel/runtime/helpers/applyDecoratedDescriptor': () => require('@babel/runtime/helpers/applyDecoratedDescriptor'),
	'@babel/runtime/helpers/arrayWithHoles': () => require('@babel/runtime/helpers/arrayWithHoles'),
	'@babel/runtime/helpers/arrayWithoutHoles': () => require('@babel/runtime/helpers/arrayWithoutHoles'),
	'@babel/runtime/helpers/assertThisInitialized': () => require('@babel/runtime/helpers/assertThisInitialized'),
	'@babel/runtime/helpers/AsyncGenerator': () => require('@babel/runtime/helpers/AsyncGenerator'),
	'@babel/runtime/helpers/asyncGeneratorDelegate': () => require('@babel/runtime/helpers/asyncGeneratorDelegate'),
	'@babel/runtime/helpers/asyncIterator': () => require('@babel/runtime/helpers/asyncIterator'),
	'@babel/runtime/helpers/asyncToGenerator': () => require('@babel/runtime/helpers/asyncToGenerator'),
	'@babel/runtime/helpers/awaitAsyncGenerator': () => require('@babel/runtime/helpers/awaitAsyncGenerator'),
	'@babel/runtime/helpers/AwaitValue': () => require('@babel/runtime/helpers/AwaitValue'),
	'@babel/runtime/helpers/classCallCheck': () => require('@babel/runtime/helpers/classCallCheck'),
	'@babel/runtime/helpers/classNameTDZError': () => require('@babel/runtime/helpers/classNameTDZError'),
	'@babel/runtime/helpers/classPrivateFieldDestructureSet': () =>
		require('@babel/runtime/helpers/classPrivateFieldDestructureSet'),
	'@babel/runtime/helpers/classPrivateFieldGet': () => require('@babel/runtime/helpers/classPrivateFieldGet'),
	'@babel/runtime/helpers/classPrivateFieldLooseBase': () =>
		require('@babel/runtime/helpers/classPrivateFieldLooseBase'),
	'@babel/runtime/helpers/classPrivateFieldLooseKey': () =>
		require('@babel/runtime/helpers/classPrivateFieldLooseKey'),
	'@babel/runtime/helpers/classPrivateFieldSet': () => require('@babel/runtime/helpers/classPrivateFieldSet'),
	'@babel/runtime/helpers/classPrivateMethodGet': () => require('@babel/runtime/helpers/classPrivateMethodGet'),
	'@babel/runtime/helpers/classPrivateMethodSet': () => require('@babel/runtime/helpers/classPrivateMethodSet'),
	'@babel/runtime/helpers/classStaticPrivateFieldSpecGet': () =>
		require('@babel/runtime/helpers/classStaticPrivateFieldSpecGet'),
	'@babel/runtime/helpers/classStaticPrivateFieldSpecSet': () =>
		require('@babel/runtime/helpers/classStaticPrivateFieldSpecSet'),
	'@babel/runtime/helpers/classStaticPrivateMethodGet': () =>
		require('@babel/runtime/helpers/classStaticPrivateMethodGet'),
	'@babel/runtime/helpers/classStaticPrivateMethodSet': () =>
		require('@babel/runtime/helpers/classStaticPrivateMethodSet'),
	'@babel/runtime/helpers/construct': () => require('@babel/runtime/helpers/construct'),
	'@babel/runtime/helpers/createClass': () => require('@babel/runtime/helpers/createClass'),
	'@babel/runtime/helpers/decorate': () => require('@babel/runtime/helpers/decorate'),
	'@babel/runtime/helpers/defaults': () => require('@babel/runtime/helpers/defaults'),
	'@babel/runtime/helpers/defineEnumerableProperties': () =>
		require('@babel/runtime/helpers/defineEnumerableProperties'),
	'@babel/runtime/helpers/defineProperty': () => require('@babel/runtime/helpers/defineProperty'),
	'@babel/runtime/helpers/extends': () => require('@babel/runtime/helpers/extends'),
	'@babel/runtime/helpers/get': () => require('@babel/runtime/helpers/get'),
	'@babel/runtime/helpers/getPrototypeOf': () => require('@babel/runtime/helpers/getPrototypeOf'),
	'@babel/runtime/helpers/inherits': () => require('@babel/runtime/helpers/inherits'),
	'@babel/runtime/helpers/inheritsLoose': () => require('@babel/runtime/helpers/inheritsLoose'),
	'@babel/runtime/helpers/initializerDefineProperty': () =>
		require('@babel/runtime/helpers/initializerDefineProperty'),
	'@babel/runtime/helpers/initializerWarningHelper': () => require('@babel/runtime/helpers/initializerWarningHelper'),
	'@babel/runtime/helpers/instanceof': () => require('@babel/runtime/helpers/instanceof'),
	'@babel/runtime/helpers/interopRequireDefault': () => require('@babel/runtime/helpers/interopRequireDefault'),
	'@babel/runtime/helpers/interopRequireWildcard': () => require('@babel/runtime/helpers/interopRequireWildcard'),
	'@babel/runtime/helpers/isNativeFunction': () => require('@babel/runtime/helpers/isNativeFunction'),
	'@babel/runtime/helpers/iterableToArray': () => require('@babel/runtime/helpers/iterableToArray'),
	'@babel/runtime/helpers/iterableToArrayLimit': () => require('@babel/runtime/helpers/iterableToArrayLimit'),
	'@babel/runtime/helpers/iterableToArrayLimitLoose': () =>
		require('@babel/runtime/helpers/iterableToArrayLimitLoose'),
	'@babel/runtime/helpers/jsx': () => require('@babel/runtime/helpers/jsx'),
	'@babel/runtime/helpers/newArrowCheck': () => require('@babel/runtime/helpers/newArrowCheck'),
	'@babel/runtime/helpers/nonIterableRest': () => require('@babel/runtime/helpers/nonIterableRest'),
	'@babel/runtime/helpers/nonIterableSpread': () => require('@babel/runtime/helpers/nonIterableSpread'),
	'@babel/runtime/helpers/objectDestructuringEmpty': () => require('@babel/runtime/helpers/objectDestructuringEmpty'),
	'@babel/runtime/helpers/objectSpread': () => require('@babel/runtime/helpers/objectSpread'),
	'@babel/runtime/helpers/objectSpread2': () => require('@babel/runtime/helpers/objectSpread2'),
	'@babel/runtime/helpers/objectWithoutProperties': () => require('@babel/runtime/helpers/objectWithoutProperties'),
	'@babel/runtime/helpers/objectWithoutPropertiesLoose': () =>
		require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
	'@babel/runtime/helpers/possibleConstructorReturn': () =>
		require('@babel/runtime/helpers/possibleConstructorReturn'),
	'@babel/runtime/helpers/readOnlyError': () => require('@babel/runtime/helpers/readOnlyError'),
	'@babel/runtime/helpers/set': () => require('@babel/runtime/helpers/set'),
	'@babel/runtime/helpers/setPrototypeOf': () => require('@babel/runtime/helpers/setPrototypeOf'),
	'@babel/runtime/helpers/skipFirstGeneratorNext': () => require('@babel/runtime/helpers/skipFirstGeneratorNext'),
	'@babel/runtime/helpers/slicedToArray': () => require('@babel/runtime/helpers/slicedToArray'),
	'@babel/runtime/helpers/slicedToArrayLoose': () => require('@babel/runtime/helpers/slicedToArrayLoose'),
	'@babel/runtime/helpers/superPropBase': () => require('@babel/runtime/helpers/superPropBase'),
	'@babel/runtime/helpers/taggedTemplateLiteral': () => require('@babel/runtime/helpers/taggedTemplateLiteral'),
	'@babel/runtime/helpers/taggedTemplateLiteralLoose': () =>
		require('@babel/runtime/helpers/taggedTemplateLiteralLoose'),
	'@babel/runtime/helpers/tdz': () => require('@babel/runtime/helpers/tdz'),
	'@babel/runtime/helpers/temporalRef': () => require('@babel/runtime/helpers/temporalRef'),
	'@babel/runtime/helpers/temporalUndefined': () => require('@babel/runtime/helpers/temporalUndefined'),
	'@babel/runtime/helpers/toArray': () => require('@babel/runtime/helpers/toArray'),
	'@babel/runtime/helpers/toConsumableArray': () => require('@babel/runtime/helpers/toConsumableArray'),
	'@babel/runtime/helpers/toPrimitive': () => require('@babel/runtime/helpers/toPrimitive'),
	'@babel/runtime/helpers/toPropertyKey': () => require('@babel/runtime/helpers/toPropertyKey'),
	'@babel/runtime/helpers/typeof': () => require('@babel/runtime/helpers/typeof'),
	'@babel/runtime/helpers/wrapAsyncGenerator': () => require('@babel/runtime/helpers/wrapAsyncGenerator'),
	'@babel/runtime/helpers/wrapNativeSuper': () => require('@babel/runtime/helpers/wrapNativeSuper'),
	'@babel/runtime/helpers/wrapRegExp': () => require('@babel/runtime/helpers/wrapRegExp'),
});

export {
	getImportedModule,
	addImportedModule,
	addImportedModules,
	hasImportedModule,
	removeImportedModule,
	listImportedModules,
};
