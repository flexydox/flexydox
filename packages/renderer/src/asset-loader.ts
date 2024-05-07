import { DocConfig } from '@flexydox/doc-schema';
import { CustomPageData, DocSchema } from '@flexydox/doc-schema';
import { readFile } from 'fs/promises';

let _docConfigCache: DocConfig;
let _docSchemaCache: DocSchema;

export interface SiteData {
  logo?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
}

async function loadConfig(docConfigFile: string): Promise<DocConfig> {
  const rawResult = await readFile(docConfigFile, { encoding: 'utf-8' });
  const cfg = JSON.parse(rawResult) as DocConfig;
  return cfg;
}

export async function getDocConfig(): Promise<DocConfig> {
  if (_docConfigCache) {
    return _docConfigCache;
  }
  const docConfigFile = process.env.FXDX_DOC_CONFIG_FILE;
  if (!docConfigFile) {
    throw new Error(
      'Doc config is not provided\nPlease provide FXDX_DOC_CONFIG_FILE environment variable with path to doc config file'
    );
  }
  _docConfigCache = await loadConfig(docConfigFile);
  return _docConfigCache;
}

export async function loadDocSchema(): Promise<DocSchema> {
  if (_docSchemaCache) {
    return _docSchemaCache;
  }
  const cfg = await getDocConfig();
  const fullPath = cfg.docSchemaFile;
  if (!fullPath) {
    throw new Error(
      'Schema API is not provided\nPlease provide FXDX_DOC_CONFIG_FILE with path to doc config file with schema API'
    );
  }
  try {
    const schema = await readFile(fullPath, { encoding: 'utf-8' });
    _docSchemaCache = JSON.parse(schema);
    return _docSchemaCache;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Error loading schema from ${fullPath}\n${e}`);
  }
}

export async function loadAllPages(): Promise<CustomPageData[]> {
  const schema = await loadDocSchema();
  return schema.customPages;
}

export async function loadPage(slug: string | undefined): Promise<CustomPageData | undefined> {
  const pages = await loadAllPages();
  return pages.find((page) => page.slug === slug);
}

export async function loadSiteData(): Promise<SiteData> {
  const cfg = await getDocConfig();
  return {
    logo: cfg.logo,
    title: cfg.title
  };
}
