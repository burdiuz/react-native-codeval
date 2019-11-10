const createEnvWrapper = (globals) => `{${Object.keys(globals).join(', ')}}`;

export const generateEnvironment = (__$__globals__) => {
  return eval(`(${createEnvWrapper(__$__globals__)}) => (__$__code__, __$__exports__ = {}) => {
    const exports = __$__exports__;
    const module = { exports };
    const __$__eval_result__ = eval(__$__code__);
  
    if(__$__eval_result__ && module.exports === __$__exports__ && !Object.keys(module.exports).length) {
      return __$__eval_result__;
    }
  
    return module.exports;
  }`)(__$__globals__);
};

export const evaluate = (code, globals = {}) => {
  const env = generateEnvironment(globals);

  return env(code);
};
