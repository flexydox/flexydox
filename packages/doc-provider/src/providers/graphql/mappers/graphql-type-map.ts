import { DocTypeKind } from '@flexydox/doc-schema';

export const GraphQLTypeMap: Record<string, DocTypeKind> = {
  GraphQLScalarType: 'SCALAR',
  GraphQLObjectType: 'OBJECT',
  GraphQLInterfaceType: 'INTERFACE',
  GraphQLUnionType: 'UNION',
  GraphQLEnumType: 'ENUM',
  GraphQLInputObjectType: 'INPUT_OBJECT',
  GraphQLList: 'LIST',
  GraphQLNonNull: 'NON_NULL'
};
