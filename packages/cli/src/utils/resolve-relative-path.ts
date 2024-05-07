import { resolve } from 'path';

export function resolveRelativePath(pathname: string) {
  if (!pathname) {
    return pathname;
  }
  if (pathname.startsWith('.')) {
    return resolve(pathname);
  } else {
    return pathname;
  }
}
