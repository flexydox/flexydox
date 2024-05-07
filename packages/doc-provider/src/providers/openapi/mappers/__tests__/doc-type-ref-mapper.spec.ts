import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { describe, expect, it } from 'vitest';
import { docTypeRefMapper } from '../doc-type-ref-mapper';

import { DocTypeRef } from '@flexydox/doc-schema';
import { createMapperContext } from '../../../../test-utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const arrayOfStrings: OpenAPI.SchemaObject = {
  type: 'array',
  items: {
    type: 'string',
    format: 'uuid'
  }
};

const refObject: OpenAPI.ReferenceObject = {
  $ref: '#/components/schemas/User'
};

const arrayOfRef: OpenAPI.SchemaObject = {
  type: 'array',
  items: {
    $ref: '#/components/schemas/User'
  }
};

const ctx = createMapperContext();
ctx.types.set('openapi3.components-schemas-User', {
  id: 'openapi3.components-schemas-User',
  name: 'User',
  description: 'User type reference',
  namespaceId: ctx.namespace.id,
  kind: 'OBJECT',
  fields: [],
  interfaces: [],
  groups: []
});

describe('openapi/mappers/docTypeRefMapper', () => {
  describe('Reference object', () => {
    const result = docTypeRefMapper(ctx, refObject);

    it('should map the reference argument', () => {
      expect(result).toEqual({
        typeId: 'openapi3.components-schemas-User',
        collectionType: 'none',
        namespaceId: ctx.namespace.id,
        required: false,
        link: {
          href: 'openapi3.components-schemas-User',
          title: 'User',
          description: 'User type reference'
        }
      } as DocTypeRef);
    });
  });
  describe('Schema object', () => {
    const ctx = createMapperContext();

    it('should map the array argument', () => {
      const result = docTypeRefMapper(ctx, arrayOfStrings);

      expect(result).toEqual({
        typeId: 'openapi3.array',
        collectionType: 'array',
        namespaceId: ctx.namespace.id,
        required: false,
        link: {
          href: 'openapi3.array',
          title: '[]',
          description: 'array'
        },
        ofType: {
          typeId: 'openapi3.string',
          collectionType: 'none',
          namespaceId: ctx.namespace.id,
          required: false,
          link: {
            href: 'openapi3.string',
            title: 'string',
            description: 'string'
          }
        }
      } as DocTypeRef);
    });
  });

  describe('Array of ref', () => {
    const result = docTypeRefMapper(ctx, arrayOfRef);

    it('should map the array argument', () => {
      expect(result).toEqual({
        typeId: 'openapi3.array',
        collectionType: 'array',
        namespaceId: ctx.namespace.id,
        required: false,
        link: {
          href: 'openapi3.array',
          title: '[]',
          description: 'array'
        },
        ofType: {
          collectionType: 'none',
          typeId: 'openapi3.components-schemas-User',
          namespaceId: ctx.namespace.id,
          required: false,
          link: {
            href: 'openapi3.components-schemas-User',
            title: 'User',
            description: 'User type reference'
          }
        }
      } as DocTypeRef);
    });
  });
});
