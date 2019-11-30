import { singleValueFactory } from '@actualwave/closure-value';
import { assignOwnPropsOverwrite } from '@actualwave/assign-own-props';

export const { get: getCurrentGlobals, set: resetGlobals } = singleValueFactory({});

function GlobalMock() {
  Object.defineProperties(this, {
    global: { value: this, enumerable: true, configurable: false },
    self: { value: this, enumerable: true, configurable: false },
  });
}

if (typeof global === 'object') {
  GlobalMock.prototype = global;
}

export const createGlobalObject = (...objs) => {
  const mock = new GlobalMock();

  return assignOwnPropsOverwrite(mock, getCurrentGlobals(), ...objs);
};
