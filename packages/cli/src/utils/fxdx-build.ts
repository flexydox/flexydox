import { join, resolve } from 'path';
import { createSimpleFullTextIndex } from '@flexydox/doc-provider';
import { DocSchema } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import { getConfig } from '../config/app-config';
import { addExamples } from './add-examples';
import { buildCustomPages } from './build-custom-pages';
import { generateDoc } from './generate-doc';
import { mergeSchemas } from './merge-schemas';
import { parseAPI } from './parse-api';

export interface BuildOptions {
  generateDocFlag: boolean;
  previewServer: boolean;
}

function jsonReplacer(_key: string, value: unknown) {
  if (value instanceof RegExp) {
    return value.toString();
  }
  return value;
}

function serializeSchema(schema: DocSchema): string {
  return JSON.stringify(schema, jsonReplacer, 2);
}

export async function fxdxBuild(options: BuildOptions) {
  const cfg = getConfig();
  const apis = cfg.apis;
  const groups = cfg.groups ?? [];

  const { previewServer, generateDocFlag } = options;

  logger.info('Building schema');
  logger.info(`Configured groups: ${groups.map((g) => g.name).join(', ')}`);

  const customPages = await buildCustomPages();

  const schemas = (await Promise.all(apis.map((api) => parseAPI(api, groups)))) as DocSchema[];
  const targetSchema = mergeSchemas(schemas);
  targetSchema.customPages = customPages;
  await addExamples(targetSchema);

  // Create a full-text index for the schema
  const ftIndex = createSimpleFullTextIndex(targetSchema);

  await mkdir(cfg.outputFolder, { recursive: true });
  const targetSchemaPath = resolve(process.cwd(), join(cfg.outputFolder, 'doc-schema.json'));

  logger.info(`Writing final schema to '${targetSchemaPath}'`);
  await writeFile(join(targetSchemaPath), serializeSchema(targetSchema), { encoding: 'utf-8' });

  await generateDoc(targetSchemaPath, previewServer, generateDocFlag, ftIndex);
}
