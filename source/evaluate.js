const createEnvWrapper = (globals) => `{${Object.keys(globals).join(', ')}}`;

export const generateEnvironment = (globals) => {
  const wrapper = eval(`(${createEnvWrapper(globals)}) => (__$__code__, exports = {}) => {
  eval(__$__code__);
  return exports;
}`);

  return wrapper(globals);
};

export const evaluate = (code, globals = {}) => {
  const env = generateEnvironment(globals);

  return env(code);
};
