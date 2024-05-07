import { DocSchema } from '@flexydox/doc-schema';

export function mergeSchemas(schemas: DocSchema[]): DocSchema {
  const mergedSchema: DocSchema = {
    namespaces: [],
    operations: [],
    types: [],
    groups: [],
    customPages: []
  };
  schemas.forEach((schema) => {
    mergedSchema.namespaces.push(...schema.namespaces);
    mergedSchema.operations.push(...schema.operations);
    mergedSchema.types.push(...schema.types);
    mergedSchema.groups.push(...schema.groups);
  });
  return mergedSchema;
}
