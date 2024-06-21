import { AssetImageData } from '@flexydox/doc-schema';

export interface GroupConfig {
  name: string;
  description?: string;
  regex?: string;
}

export interface APIDefinitionConfig {
  id: string;
  name: string;
  url: string;
  version: string;
  inferGroups: boolean;
  docUrl?: string;
}

/**
 * Application configuration
 **/
export interface AppConfig {
  /**
   * List of APIs to generate
   **/
  apis: APIDefinitionConfig[];
  outputFolder: string;
  base: string;
  site: string;
  title: string;
  logo: AssetImageData;
  /**
   * Groups configuration
   **/
  groups: GroupConfig[];
  /**
   * Custom page files
   * Generator will generate a page for each file
   **/
  customPagesFiles: string[];
  /**
   * Folder where custom pages are stored
   * Generator will look for .md files in this folder and generate a page for each file
   **/
  customPagesFolder: string;

  /**
   * Folder where examples are stored
   **/
  examplesFolder: string;
}

let config: AppConfig;

export function setConfig(cfg: AppConfig) {
  config = cfg;
  config.outputFolder = config.outputFolder ?? process.cwd();
}

export function getConfig() {
  return config;
}
