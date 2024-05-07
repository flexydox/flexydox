import { isAbsolute, resolve } from 'path';

let configDirectory = '.';

export function setConfigDirectory(path: string) {
  configDirectory = path;
}

export function isRelativePath(pathname: string) {
  return !isAbsolute(pathname);
}

export function resolveRelativePathToConfigFile(pathname: string) {
  if (!pathname) {
    return pathname;
  }
  if (isRelativePath(pathname)) {
    return resolve(configDirectory, pathname);
  } else {
    return pathname;
  }
}

export function resolveRelativePathToCwd(pathname: string) {
  if (!pathname) {
    return pathname;
  }
  if (isRelativePath(pathname)) {
    return resolve(process.cwd(), pathname);
  } else {
    return pathname;
  }
}
