import { DocType, Namespace, OperationArgument } from '@flexydox/doc-schema';

import { logger } from '@flexydox/logger';
import { GraphQLArgument, getNamedType } from 'graphql';
import { mapTypeRef } from './map-type-ref';

export function mapGraphQLOperationArgument(
  namespace: Namespace,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  argument: GraphQLArgument,
  schemaTypes: DocType[]
): OperationArgument {
  const underlyingType = getNamedType(argument.type);
  const schemaType = schemaTypes.find((t) => t.name === underlyingType.name);
  if (!schemaType) {
    throw new Error(`Type ${argument.name} not found in schema during field mapping`);
  }

  logger.trace(`> mapping field ${argument.name} of type ${underlyingType.name}`);

  const typeRef = mapTypeRef(namespace, argument.type, schemaTypes);
  const result: OperationArgument = {
    name: argument.name,
    description: argument.description,
    deprecationReason: argument.deprecationReason,
    typeRef
  };

  return result;
}
