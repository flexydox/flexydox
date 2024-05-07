import { DocTypeField } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { docTypeRefMapper, refToTypeId } from './doc-type-ref-mapper';

/**
 * Maps an OpenAPI.SchemaObject to a DocTypeField
 * @param ctx The MapperContext
 * @param propertyKey The property key
 * @param property The OpenAPI.SchemaObject | OpenAPI.ReferenceObject
 * @returns The DocTypeField
 */
export function docTypeFieldMapper(
  ctx: MapperContext,
  propertyKey: string,
  property: OpenAPI.SchemaObject | OpenAPI.ReferenceObject
): DocTypeField {
  const { namespace } = ctx;
  if ('$ref' in property) {
    return {
      name: propertyKey,
      typeRef: docTypeRefMapper(ctx, property)
    };
  }
  if (property.type === 'array') {
    return {
      name: propertyKey,
      typeRef: {
        typeId: refToTypeId(namespace, 'array'),
        collectionType: 'array',
        required: !property.nullable,
        namespaceId: namespace.id,
        link: {
          href: refToTypeId(namespace, 'array'),
          title: propertyKey,
          description: property.description
        },
        ofType: docTypeRefMapper(ctx, property.items)
      }
    };
  }
  return {
    name: propertyKey,
    description: property.description,
    typeRef: docTypeRefMapper(ctx, property)
  };
}
