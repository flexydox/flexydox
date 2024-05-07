import { GraphQLNamedType, GraphQLSchema } from 'graphql';

export function isInternalType(_schema: GraphQLSchema, t: GraphQLNamedType) {
  return t.name.startsWith('__');
}
