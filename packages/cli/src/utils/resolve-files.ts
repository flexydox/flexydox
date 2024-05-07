import { extname, join } from 'path';
import { SourceSpec } from '@flexydox/doc-schema';
import { readFile, readdir } from 'fs/promises';
import { getConfig } from '../config/app-config';
import { resolveRelativePath } from './resolve-relative-path';

import { logger } from '@flexydox/logger';
import yaml from 'js-yaml';

export interface SharedExampleData {
  headers: Record<string, string>;
}

async function getFilesFromFolder(folder: string, extension: string): Promise<string[]> {
  if (!folder) {
    return [];
  }
  const files = await readdir(folder);
  const mdFiles = files.filter((file) => extname(file) === extension);
  return mdFiles.map((file) => join(folder, file));
}

export async function resolveAllPageFiles(): Promise<string[]> {
  const appConfig = getConfig();
  if (!appConfig.customPagesFolder) {
    logger.warn('Custom pages folder not provided');
    return [];
  }

  const files = appConfig.customPagesFiles ?? [];

  const filesFromFolder = await getFilesFromFolder(appConfig.customPagesFolder, '.md');
  const allFiles = [...files, ...filesFromFolder];
  return allFiles.map((file) => resolveRelativePath(file));
}

export async function loadSharedExampleConfig(apiId: string): Promise<SharedExampleData | null> {
  const appConfig = getConfig();
  if (!appConfig.examplesFolder) {
    logger.warn('Examples folder not provided');
    return null;
  }
  const folder = join(appConfig.examplesFolder, apiId);
  let fileContent = null;
  const fileName = join(folder, '.shared.yaml');
  try {
    fileContent = await readFile(fileName, 'utf8');
  } catch {
    return null;
  }
  try {
    return yaml.load(fileContent) as SharedExampleData;
  } catch {
    logger.error(`Error parsing shared example file: ${fileName}`);
    return null;
  }
}

export async function resolveAllExampleFiles(apiId: string, spec: SourceSpec): Promise<string[]> {
  const appConfig = getConfig();
  if (!appConfig.examplesFolder) {
    logger.warn('Examples folder not provided');
    return [];
  }

  const folder = join(appConfig.examplesFolder, apiId);

  const extension = spec === 'graphql' ? '.graphql' : '.http';

  const filesFromFolder = await getFilesFromFolder(folder, extension);
  return filesFromFolder.map((file) => resolveRelativePath(file));
}
