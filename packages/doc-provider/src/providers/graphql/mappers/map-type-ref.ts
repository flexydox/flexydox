/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { DocType, DocTypeRef, Namespace } from '@flexydox/doc-schema';
import { GraphQLList, GraphQLNonNull, GraphQLNullableType } from 'graphql';
import { getTypeId } from '../../../utils/get-type-id';

export function mapTypeRef(
  namespace: Namespace,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  type: Partial<GraphQLNullableType> | Partial<GraphQLList<any>> | Partial<GraphQLNonNull<any>>,
  schemaTypes: DocType[],
  required?: boolean
): DocTypeRef {
  if (type instanceof GraphQLNonNull) {
    return mapTypeRef(namespace, type.ofType, schemaTypes, true);
  }
  if (type instanceof GraphQLList) {
    const docTypeRefList: DocTypeRef = {
      typeId: getTypeId(namespace, 'Array'),
      namespaceId: namespace.id,
      collectionType: 'array',
      required: !!required,
      ofType: mapTypeRef(namespace, type.ofType, schemaTypes),
      link: {
        href: getTypeId(namespace, 'Array'),
        title: '[]'
      }
    };

    return docTypeRefList;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const nonListGQLType = type as Exclude<GraphQLNullableType, GraphQLList<any>>;

  const schemaType = schemaTypes.find((t) => t.name === nonListGQLType.name);
  if (!schemaType) {
    throw new Error(`Type ${nonListGQLType.name} not found in schema during field mapping`);
  }
  const docTypeRef: DocTypeRef = {
    typeId: schemaType.id,
    namespaceId: namespace.id,
    required: !!required,
    collectionType: 'none',
    link: {
      href: getTypeId(namespace, schemaType.name),
      title: schemaType.name,
      description: schemaType.description
    }
  };
  return docTypeRef;
}
