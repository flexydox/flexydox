import { basename, join } from 'path';
import { copyFile, mkdir } from 'fs/promises';

const assetsPrefix = '/custom-assets/';

export function customAssetDir(outDir: string): string {
  return join(outDir, assetsPrefix);
}

export function isHttpPath(url: string): boolean {
  if (!url) {
    return false;
  }
  return url.startsWith('http');
}

export function getAssetsSrc(url: string): string {
  if (!url) {
    return url;
  }
  if (isHttpPath(url)) {
    return url;
  }
  const fileName = basename(url);
  return join(assetsPrefix, fileName);
}

function getAssetOutputPath(url: string, outDir: string): string {
  if (isHttpPath(url)) {
    return url;
  }
  const fileName = getAssetsSrc(url);
  return join(outDir, fileName);
}

export async function copyAsset(assetUrl: string, outDir: string) {
  if (!assetUrl) {
    return;
  }
  if (!outDir) {
    throw new Error('Output directory is not provided');
  }
  if (isHttpPath(assetUrl)) {
    return;
  }
  await mkdir(customAssetDir(outDir), { recursive: true });
  const outPath = getAssetOutputPath(assetUrl, outDir);
  await copyFile(assetUrl, outPath);
}
