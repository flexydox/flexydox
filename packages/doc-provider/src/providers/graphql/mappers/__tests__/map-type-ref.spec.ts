import { DocType, Namespace } from '@flexydox/doc-schema';
import { GraphQLObjectType, GraphQLScalarType } from 'graphql';
import { describe, expect, it } from 'vitest';
import { mapTypeRef } from '../map-type-ref';

describe('mapTypeRef', () => {
  const namespace: Namespace = {
    id: 'ns1',
    name: 'ns1',
    spec: 'graphql',
    source: 'http://localhost:4000/graphql',
    inferGroups: true
  };

  const allTypes: DocType[] = [
    {
      id: 'ns1.User',
      name: 'User',
      namespaceId: namespace.id,
      kind: 'object',
      description: 'User description',

      fields: [
        {
          name: 'firstName',
          typeRef: {
            typeId: 'String',
            collectionType: 'none',
            namespaceId: namespace.id,
            required: true,
            link: {
              href: 'ns1.String',
              title: 'String'
            }
          }
        }
      ],
      groups: []
    }
  ];

  describe('map User object', () => {
    const gqlUser: GraphQLObjectType = new GraphQLObjectType({
      name: 'User',
      description: 'User description',
      fields: {
        firstName: { type: new GraphQLScalarType({ name: 'String' }) }
      }
    });

    it('optional User', () => {
      const result = mapTypeRef(namespace, gqlUser, allTypes);
      expect(result).toMatchObject({
        typeId: 'ns1.User',
        namespaceId: namespace.id,
        required: false,
        link: {
          href: 'ns1.User',
          title: 'User',
          description: 'User description'
        }
      });
    });
  });
});
