import { join } from 'node:path';

export function linkUrl(url: string) {
  // @ts-ignore
  return join(import.meta.env.BASE_URL, url);
}
