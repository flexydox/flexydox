import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { describe, expect, it } from 'vitest';
import { docTypeMapper } from '../doc-type-mapper';

import { DocType } from '@flexydox/doc-schema';
import { createMapperContext } from '../../../../test-utils';

const ctx = createMapperContext();

const userDocType: DocType = {
  id: 'openapi3.components-schemas-User',
  name: 'User',
  description: 'User type reference',
  namespaceId: ctx.namespace.id,
  kind: 'object',
  fields: [
    {
      name: 'firstName',
      description: 'First name',
      typeRef: {
        typeId: 'openapi3.string',
        collectionType: 'none',
        namespaceId: ctx.namespace.id,
        required: false,
        link: {
          title: 'string',
          href: 'openapi3.string',
          description: 'string'
        }
      }
    }
  ],
  interfaces: [],
  groups: []
};

const allOfSchema: OpenAPI.SchemaObject = {
  allOf: [
    {
      $ref: '#/components/schemas/User'
    },
    {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Username'
        }
      }
    }
  ]
};

const anyOfSchema: OpenAPI.SchemaObject = {
  anyOf: [
    {
      type: 'object',
      description: 'AnyOfUser object',
      properties: {
        age: {
          type: 'number',
          description: 'Age'
        }
      }
    },

    {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Username'
        }
      }
    }
  ]
};

const user: OpenAPI.SchemaObject = {
  type: 'object',
  description: 'User object',
  properties: {
    firstName: {
      type: 'string',
      description: 'First name',
      nullable: true
    },
    lastName: {
      type: 'string',
      description: 'Last name',
      nullable: false
    },
    age: {
      type: 'integer',
      format: 'int32',
      description: 'Age in years'
    }
  },
  additionalProperties: false
};

const account: OpenAPI.SchemaObject = {
  type: 'object',
  description: 'Account object',
  properties: {
    username: {
      type: 'string',
      description: 'Username',
      nullable: false
    },
    user: {
      $ref: '#/components/schemas/User'
    }
  }
};

describe('openapi/mappers/docTypeMapper', () => {
  describe('User object', () => {
    const result = docTypeMapper(ctx, 'components-schemas', 'User', user);

    it('should map User', () => {
      expect(result).toMatchObject({
        id: 'openapi3.components-schemas-User',
        namespaceId: ctx.namespace.id,
        groups: [],
        kind: 'object',
        name: 'User',
        description: 'User object',
        fields: [
          {
            description: 'First name',
            name: 'firstName',
            typeRef: {
              typeId: 'openapi3.string',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'string',
                href: 'openapi3.string',
                description: 'string'
              }
            }
          },
          {
            name: 'lastName',
            description: 'Last name'
          },
          {
            name: 'age',
            description: 'Age in years',
            typeRef: {
              typeId: 'openapi3.integer',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'integer',
                href: 'openapi3.integer',
                description: 'integer'
              }
            }
          }
        ]
      } as DocType);
    });
  });
  describe('Account object', () => {
    const ctx = createMapperContext();
    describe('with User object resolved', () => {
      ctx.types.set('openapi3.components-schemas-User', userDocType);
      const result = docTypeMapper(ctx, 'components-schemas', 'Account', account);

      it('should map Account', () => {
        expect(result).toMatchObject({
          id: 'openapi3.components-schemas-Account',
          namespaceId: ctx.namespace.id,
          groups: [],
          kind: 'object',
          name: 'Account',
          description: 'Account object',
          fields: [
            {
              name: 'username',
              description: 'Username'
            },
            {
              name: 'user',
              typeRef: {
                typeId: 'openapi3.components-schemas-User',
                namespaceId: ctx.namespace.id,
                collectionType: 'none',
                required: false,
                link: {
                  title: 'User',
                  href: 'openapi3.components-schemas-User',
                  description: 'User type reference'
                }
              }
            }
          ]
        } as DocType);
      });
    });
  });

  describe('All of schema', () => {
    const ctx = createMapperContext();
    ctx.types.set('openapi3.components-schemas-User', userDocType);
    const result = docTypeMapper(ctx, 'components-schemas', 'User', allOfSchema);
    it('should map allOf schema', () => {
      expect(result).toMatchObject({
        id: 'openapi3.components-schemas-User',
        namespaceId: ctx.namespace.id,
        interfaces: [],
        groups: [],
        kind: 'object',
        name: 'User',
        description: 'User type reference',
        fields: [
          {
            description: 'First name',
            name: 'firstName',
            typeRef: {
              typeId: 'openapi3.string',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'string',
                href: 'openapi3.string',
                description: 'string'
              }
            }
          },
          {
            name: 'username',
            description: 'Username',
            typeRef: {
              typeId: 'openapi3.string',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'string',
                href: 'openapi3.string',
                description: 'string'
              }
            }
          }
        ]
      } as DocType);
    });
  });

  describe('Any of schema', () => {
    const ctx = createMapperContext();
    const result = docTypeMapper(ctx, 'components-schemas', 'AnyOfUser', anyOfSchema);
    it('should map anyOf schema', () => {
      expect(result).toMatchObject({
        id: 'openapi3.components-schemas-AnyOfUser',
        namespaceId: ctx.namespace.id,
        groups: [],
        kind: 'object',
        name: 'AnyOfUser',
        description: 'AnyOfUser object',
        fields: [
          {
            description: 'Age',
            name: 'age',
            typeRef: {
              typeId: 'openapi3.number',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'number',
                href: 'openapi3.number',
                description: 'number'
              }
            }
          },
          {
            name: 'username',
            description: 'Username',
            typeRef: {
              typeId: 'openapi3.string',
              collectionType: 'none',
              namespaceId: ctx.namespace.id,
              required: false,
              link: {
                title: 'string',
                href: 'openapi3.string',
                description: 'string'
              }
            }
          }
        ]
      } as DocType);
    });
  });
});
