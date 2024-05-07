export function stringToRegex(str: string | undefined | null): RegExp | undefined {
  if (!str) {
    return;
  }
  if (!str.startsWith('/')) {
    return new RegExp(str, 'i');
  }
  const re = /\/(.+)\/([gim]{0,3})/;
  const match = str.match(re);
  if (match) {
    return new RegExp(match[1], match[2]);
  }
}
