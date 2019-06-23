const createEnvWrapper = (globals) => `{${Object.keys(globals).join(', ')}}`;

export const generateEnvironment = (globals) => {
  const wrapper = eval(`(${createEnvWrapper(globals)}) => (__$__code__, __$__exports__ = {}) => {
  const exports = __$__exports__;
  const module = { exports };
  const __$__eval_result__ = eval(__$__code__);

  if(__$__eval_result__ && module.exports === __$__exports__ && !Object.keys(module.exports).length) {
    return __$__eval_result__;
  }

  return module.exports;
}`);

  return wrapper(globals);
};

export const evaluate = (code, globals = {}) => {
  const env = generateEnvironment(globals);

  return env(code);
};
