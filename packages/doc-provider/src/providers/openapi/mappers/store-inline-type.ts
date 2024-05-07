import { DocType } from '@flexydox/doc-schema';
import { MapperContext } from '../../mapper-context';
import { docTypeMapper } from './doc-type-mapper';

import { OpenAPIV3 as OpenAPI } from 'openapi-types';

let inlineTypeCounter = 0;

const inlineTypePrefix = 'inline-types-';

export function storeInlineType(
  ctx: MapperContext,
  schema: OpenAPI.SchemaObject | OpenAPI.ReferenceObject
): DocType | null {
  const inlineTypeKey = `${inlineTypeCounter++}`;
  const docType = docTypeMapper(ctx, inlineTypePrefix, inlineTypeKey, schema);
  if (!docType) {
    return null;
  }
  ctx.types.set(docType.id, docType);
  return docType;
}
