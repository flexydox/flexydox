import { DocType, DocTypeField, Namespace, OperationArgument } from '@flexydox/doc-schema';

import { logger } from '@flexydox/logger';
import { GraphQLField, GraphQLInputField, getNamedType } from 'graphql';
import { mapGraphQLOperationArgument } from './map-graphql-operation-argument';
import { mapTypeRef } from './map-type-ref';

export function mapGraphQLTypeField(
  namespace: Namespace,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  field: GraphQLField<any, any, any> | GraphQLInputField,
  schemaTypes: DocType[],
  isInput: boolean
): DocTypeField {
  const underlyingType = getNamedType(field.type);
  const schemaType = schemaTypes.find((t) => t.name === underlyingType.name);
  if (!schemaType) {
    throw new Error(`Type ${field.name} not found in schema during field mapping`);
  }

  logger.trace(`> mapping field ${field.name} of type ${underlyingType.name}`);

  let operationArguments: OperationArgument[] | undefined = undefined;
  // input fields do not have arguments
  if (!isInput) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const f = field as GraphQLField<any, any, any>;
    const fields = f.args;
    if (fields.length > 0) {
      operationArguments = fields.map((ff) =>
        mapGraphQLOperationArgument(namespace, ff, schemaTypes)
      );
      logger.trace(
        `> mapped args for field ${f.name}: ${operationArguments.map((a) => a.name).join(', ')}`
      );
    }
  }

  const typeRef = mapTypeRef(namespace, field.type, schemaTypes);
  const dtf: DocTypeField = {
    name: field.name,
    description: field.description,
    deprecationReason: field.deprecationReason,
    typeRef,
    arguments: operationArguments
  };

  return dtf;
}
