import { DocType } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { addMatchedGroups } from '../../../utils/add-matched-groups';
import { MapperContext } from '../../mapper-context';
import { mergeDocTypesFields } from '../../merge-doc-types';
import { getOAPITypeId } from '../utils/get-oapi-type-id';
import { docTypeFieldsMapper } from './doc-type-fields-mapper';
import { docTypeKindMapper } from './doc-type-kind-mapper';

/**
 * Maps an OpenAPI.SchemaObject to a DocType
 * @param ctx The MapperContext
 * @param schemaKey The schema key
 * @param schema The OpenAPI.SchemaObject
 * @returns The DocType
 */
export function docTypeMapper(
  ctx: MapperContext,
  schemaPath: string,
  schemaKey: string,
  schema: OpenAPI.SchemaObject | OpenAPI.ReferenceObject
): DocType | null {
  const typeId = getOAPITypeId(ctx.namespace, schemaPath, schemaKey);
  if ('$ref' in schema) {
    return ctx.types.get(typeId) ?? null;
  }
  const unionSchema = schema.allOf ?? schema.anyOf ?? [];
  if (schema.allOf ?? schema.anyOf) {
    const docTypes = unionSchema
      .map((schema) => {
        return docTypeMapper(ctx, schemaPath, schemaKey, schema);
      })
      .filter((docType): docType is DocType => docType !== null);

    return mergeDocTypesFields(docTypes);
  }

  const matchedGroups = addMatchedGroups(
    [...ctx.groups.values()],
    schemaKey,
    `type ${schemaPath}${schemaKey}`
  );

  if (schema.oneOf) {
    const types = (schema.oneOf ?? [])
      .map((oneOfSchema, index) => {
        const docType = docTypeMapper(ctx, schemaPath, `${schemaKey}-one-of-${index}`, oneOfSchema);
        if (docType) {
          ctx.types.set(docType.id, docType);
        }
        return docType;
      })
      .filter((docType): docType is DocType => docType !== null);

    return {
      id: typeId,
      name: schemaKey,
      namespaceId: ctx.namespace.id,
      kind: docTypeKindMapper(schema.type),
      groups: matchedGroups,
      types: types.map((type) => type.id),
      description: schema.description,
      fields: docTypeFieldsMapper(ctx, schema)
    };
  }

  return {
    id: typeId,
    name: schemaKey,
    namespaceId: ctx.namespace.id,
    kind: docTypeKindMapper(schema.type),
    groups: matchedGroups,
    description: schema.description,
    fields: docTypeFieldsMapper(ctx, schema)
  };
}
