import { logger } from '@flexydox/logger';
import { access, readFile } from 'fs/promises';
import yaml from 'js-yaml';
import { AppConfig, setConfig } from '../config/app-config';

async function parseConfigFileYaml(filePath: string): Promise<AppConfig | null> {
  let fileContent = null;
  try {
    fileContent = await readFile(filePath, 'utf8');
  } catch {
    return null;
  }
  try {
    return yaml.load(fileContent) as AppConfig;
  } catch {
    logger.error(`Error parsing config file: ${filePath}`);
    return null;
  }
}

export async function parseConfigFile(configPath: string | null | undefined): Promise<void> {
  if (!configPath) {
    logger.error('Config file not provided. Please provide a config file using --config option');
    process.exit(1);
  }
  try {
    await access(configPath);
  } catch {
    logger.error(`Config file not found: '${configPath}'. Please provide a valid --config option`);
    process.exit(1);
  }
  const cfg = await parseConfigFileYaml(configPath);
  if (!cfg) {
    logger.error(
      `Config file cannot be parsed: '${configPath}'. Please provide a valid --config option`
    );
    process.exit(1);
  }
  setConfig(cfg);
}
