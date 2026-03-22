const pick = <T extends Record<string, unknown>>(object: T, keys: string[]): Partial<T> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      (obj as Record<string, unknown>)[key] = object[key];
    }
    return obj;
  }, {} as Partial<T>);
};

export default pick;
