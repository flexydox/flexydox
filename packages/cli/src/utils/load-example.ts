import { getTypeId } from '@flexydox/doc-provider';
import { readFile } from 'fs/promises';

import { basename } from 'path';
import { Namespace, OperationExample } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import matter from 'gray-matter';

function fileNameToOperationName(fileName: string): string {
  return basename(fileName.split('.').slice(0, -1).join('.'));
}

export async function loadExample(ns: Namespace, fileUrl: string): Promise<OperationExample> {
  const rawContent = await readFile(fileUrl, {
    encoding: 'utf-8'
  });
  const lang = ns.spec === 'graphql' ? 'graphql' : 'http';
  const { data: frontMatterData, content } = matter(rawContent);
  const baseName = fileNameToOperationName(fileUrl);
  const operationId = getTypeId(ns, baseName);
  logger.info(`Loading example ${fileUrl}, title: ${baseName}, operationId: ${operationId}`);

  return {
    operationId,
    title: frontMatterData.title ?? baseName,
    description: frontMatterData.description ?? '',
    lang,
    code: content,
    headers: frontMatterData.headers ?? {}
  };
}
