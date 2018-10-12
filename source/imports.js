import { valuesMapFactory } from '@actualwave/closure-value';

export const {
  get: getImportedModule,
  set: addImportedModule,
  has: hasImportedModule,
  delete: removeImportedModule,
} = valuesMapFactory();

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
