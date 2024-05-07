import { dirname, join } from 'path';
import { readFile, writeFile } from 'fs/promises';

export interface AssetImageData {
  url: string;
  alt: string;
  width: number;
  height: number;
}
/**
 * DocConfig interface - used by renderer
 * to locate the docSchema file and other assets
 */
export interface DocConfig {
  /**
   * docSchema file path
   */
  docSchemaFile: string;
  /**
   * Main title
   */
  title: string;
  /**
   * Logo
   */
  logo?: AssetImageData;
}

export async function saveConfig(cfg: DocConfig): Promise<string> {
  const outputDir = dirname(cfg.docSchemaFile);
  const configFile = join(outputDir, 'doc-config.json');
  await writeFile(configFile, JSON.stringify(cfg, null, 2));
  return configFile;
}
