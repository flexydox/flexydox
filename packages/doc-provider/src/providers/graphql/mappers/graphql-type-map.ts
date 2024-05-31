import { DocTypeKind } from '@flexydox/doc-schema';

export const GraphQLTypeMap: Record<string, DocTypeKind> = {
  GraphQLScalarType: 'scalar',
  GraphQLObjectType: 'object',
  GraphQLInterfaceType: 'interface',
  GraphQLUnionType: 'union',
  GraphQLEnumType: 'enum',
  GraphQLInputObjectType: 'input',
  GraphQLList: 'list'
};
