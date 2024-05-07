import { DocType, DocTypeRef, Namespace } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { getOAPITypeId } from '../utils/get-oapi-type-id';
import { storeInlineType } from './store-inline-type';

/**
 * Maps an OpenAPI.ReferenceObject | OpenAPI.ParameterObject to a DocTypeRef
 * @param namespace The namespace
 * @param title The title
 * @param objOrRef The OpenAPI.ReferenceObject | OpenAPI.ParameterObject
 * @returns The DocTypeRef
 */
export function docTypeRefMapper(
  ctx: MapperContext,
  objOrRef: OpenAPI.SchemaObject | OpenAPI.ReferenceObject | undefined
): DocTypeRef {
  const { namespace } = ctx;
  if (!objOrRef) {
    return unknownTypeRef(namespace);
  }
  if ('$ref' in objOrRef) {
    return referenceToTypeRef(ctx, objOrRef);
  }
  return schemaObjectToTypeRef(ctx, objOrRef);
}

function unknownTypeRef(namespace: Namespace): DocTypeRef {
  return {
    typeId: refToTypeId(namespace, 'unknown'),
    namespaceId: namespace.id,
    collectionType: 'none',
    required: false,
    link: {
      href: null,
      title: 'unknown',
      description: 'unknown type reference'
    }
  };
}

/**
 * Maps an OpenAPI.ReferenceObject to a DocTypeRef
 * @param ctx The MapperContext
 * @param allDocTypes The map of all DocTypes
 * @param ref The OpenAPI.ReferenceObject
 * @returns The DocTypeRef
 */
function referenceToTypeRef(ctx: MapperContext, ref: OpenAPI.ReferenceObject): DocTypeRef {
  const { namespace } = ctx;

  const docType = ctx.types.get(refToTypeId(namespace, ref.$ref));
  if (!docType) {
    return unknownTypeRef(namespace);
  }
  return docTypeToTypeRef(ctx, docType);
}

/**
 * Maps an OpenAPI.SchemaObject to a DocTypeRef
 * @param ctx The MapperContext
 * @param schemaObj The OpenAPI.SchemaObject
 * @returns The DocTypeRef
 **/
export function schemaObjectToTypeRef(
  ctx: MapperContext,
  schemaObj: OpenAPI.SchemaObject
): DocTypeRef {
  const required = !!schemaObj.required;
  const { namespace } = ctx;
  if (schemaObj.type === 'array') {
    const ofType = docTypeRefMapper(ctx, schemaObj.items);
    return arrayTypeRef(ctx, required, ofType);
  }
  const docType = ctx.types.get(schemaObj.type ?? 'unknown');
  if (!docType && schemaObj.type !== 'object') {
    const typeId = refToTypeId(namespace, schemaObj.type ?? 'unknown');
    const schemaType = schemaObj.type ?? 'unknown';
    return {
      typeId,
      namespaceId: namespace.id,
      collectionType: 'none',
      required,
      link: {
        href: typeId,
        title: schemaType,
        description: schemaType
      }
    };
  }

  if (!docType) {
    const inlineDocType = storeInlineType(ctx, schemaObj);
    if (!inlineDocType) {
      logger.warn(`Failed to map inline type ${schemaObj.type}`);
      return unknownTypeRef(namespace);
    }
    return docTypeToTypeRef(ctx, inlineDocType);
  }
  return docTypeToTypeRef(ctx, docType);
}

function docTypeToTypeRef(ctx: MapperContext, docType: DocType): DocTypeRef {
  return {
    typeId: docType.id,
    namespaceId: ctx.namespace.id,
    collectionType: 'none',
    required: false,
    link: {
      href: docType.id,
      title: docType.name,
      description: docType.description
    }
  };
}

function arrayTypeRef(ctx: MapperContext, required: boolean, ofType: DocTypeRef): DocTypeRef {
  const { namespace } = ctx;
  return {
    typeId: refToTypeId(namespace, 'array'),
    namespaceId: namespace.id,
    collectionType: 'array',
    required,
    link: {
      href: refToTypeId(namespace, 'array'),
      title: '[]',
      description: 'array'
    },
    ofType
  };
}

/**
 * Maps a OpenAPI reference to a type id
 * @param namespace The namespace
 * @param ref The reference string
 * @returns The type id
 **/
export function refToTypeId(namespace: Namespace, ref: string): string {
  const cleansedRef = (ref || '').replace(/^#/, '');
  const parts = cleansedRef.split('/').filter((part) => part);
  const path = parts.slice(0, -1).join('-');
  const typeId = parts[parts.length - 1];
  return getOAPITypeId(namespace, path, typeId);
}
