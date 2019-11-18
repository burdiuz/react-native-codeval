const CODE_SEARCH_RGX = /(^|[^\w.])require\s*\(\s*["'`][^"'`]+/g;
const REQUIRE_NAME_RGX = /[^"'`]+$/;

export const findRequiredDependencyNames = (code) => {
  // env supports <= groups
  // return code.match(/(?<=require\s*\(\s*["'`])([^"'`]+)/g);

  const names = {};
  return (code.match(CODE_SEARCH_RGX) || [])
    .map((req) => req.match(REQUIRE_NAME_RGX)[0])
    .filter((item) => {
      if (names[item]) {
        return false;
      }

      names[item] = true;
      return true;
    });
};
