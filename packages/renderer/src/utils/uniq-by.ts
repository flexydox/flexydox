export function uniqBy<T>(arr: T[], predicate: (val: T) => string) {
  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : predicate(item);

        map.has(key) || map.set(key, item);

        return map;
      }, new Map())
      .values()
  ];
}
