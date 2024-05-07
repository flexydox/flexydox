import { DocTypeField } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { docTypeFieldMapper } from './doc-type-field-mapper';

/**
 * Maps an OpenAPI.SchemaObject to a DocTypeField[]
 * @param ctx The MapperContext
 * @param schema The OpenAPI.SchemaObject
 * @returns The DocTypeField[]
 */
export function docTypeFieldsMapper(
  ctx: MapperContext,
  schema: OpenAPI.SchemaObject
): DocTypeField[] {
  const properties = schema.properties;
  if (!properties) {
    return [];
  }
  const propertyKeys = Object.keys(properties);

  return propertyKeys.map((propertyKey) => {
    const property = properties[propertyKey];
    return docTypeFieldMapper(ctx, propertyKey, property);
  });
}
