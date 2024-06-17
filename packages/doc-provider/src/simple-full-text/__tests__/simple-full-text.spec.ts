import { describe, it, expect } from 'vitest';

import { createSimpleFullTextIndex } from '../index';
import { DocSchema, DocTypeRef } from '@flexydox/doc-schema';

const createTypeRef = (): DocTypeRef => ({
  typeId: 'ns1.dummy',
  namespaceId: 'ns1',
  required: true,

  collectionType: 'none',
  link: {
    title: 'Dummy'
  }
});

const testSchema: DocSchema = {
  types: [
    {
      id: 'ns1.person',
      namespaceId: 'ns1',
      kind: 'object',
      groups: ['People'],
      name: 'Person',
      description: `Person represents a living human being.
      It has a first name and a last name.
      Note: This is a **dummy type** for testing purposes.
      `,
      fields: [
        {
          name: 'firstName',
          description: 'First name of the person',
          typeRef: createTypeRef()
        }
      ]
    }
  ],
  operations: [
    {
      id: 'ns1.people-get',
      namespaceId: 'ns1',
      examples: [],
      returns: [],
      operationKind: 'read',
      operationType: 'get',
      groups: ['People'],
      name: 'get People',
      description: `Get people
      This operation returns a list of people.
      `,
      arguments: [
        {
          name: 'query',
          description: 'query argument description',
          typeRef: createTypeRef()
        }
      ]
    }
  ],
  customPages: [],
  groups: [],
  namespaces: [
    {
      id: 'ns1',
      inferGroups: true,
      name: 'Namespace1',
      description: 'Namespace1 description',
      spec: 'openapi3.0',
      source: 'http://example.com/ns1.yaml'
    }
  ]
};

describe('create simple full text index', () => {
  const indexData = createSimpleFullTextIndex(testSchema);
  it('should index Person type', () => {
    const result = indexData.items.find((item) => item.id === 'type-ns1.person');
    expect(result).toBeDefined();
    expect(result?.content).toContain('person');
  });

  it('should index get People operation', () => {
    const result = indexData.items.find((item) => item.id === 'operation-ns1.people-get');
    expect(result).toBeDefined();
    expect(result?.content).toContain('people');
  });

  it('should index firstName field', () => {
    const result = indexData.items.find((item) => item.id === 'field-ns1.person-firstName');
    expect(result).toBeDefined();
    expect(result?.content).toContain('firstname');
  });
});
