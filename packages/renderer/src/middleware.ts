import { DocSchema, GroupDefinition } from '@flexydox/doc-schema';
import { defineMiddleware } from 'astro/middleware';
import { loadDocSchema } from './asset-loader';
import { uniqBy } from './utils/uniq-by';

export function sortGroups(g1: GroupDefinition, g2: GroupDefinition): number {
  const g1Hash = g1?.name?.toLowerCase();
  const g2Hash = g2?.name?.toLowerCase();
  return g1Hash.localeCompare(g2Hash);
}

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  const doc: DocSchema = await loadDocSchema();
  const types = doc.types;

  const distinctGroups = uniqBy(doc.groups, (g) => g.id);

  const sortedGroups = distinctGroups.sort(sortGroups);
  doc.groups = sortedGroups;
  context.locals.nextId = 1;
  context.locals.doc = doc;
  context.locals.types = types;
  context.locals.operations = doc.operations;
  context.locals.namespaces = doc.namespaces;
  const response = await next();
  return response;
});
