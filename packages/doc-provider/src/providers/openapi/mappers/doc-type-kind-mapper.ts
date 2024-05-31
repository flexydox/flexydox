import { DocTypeKind } from '@flexydox/doc-schema';

/**
 * Maps a type of an OpenAPI.SchemaObject to a DocTypeKind
 * @param type The type of the OpenAPI.SchemaObject
 */
export function docTypeKindMapper(type: string | null | undefined): DocTypeKind {
  switch (type) {
    case 'array':
      return 'list';
    case 'object':
      return 'object';
    default:
      return 'scalar';
  }
}
