import type {
  DocOperation,
  DocType,
  GroupDefinition,
  Namespace,
  OperationArgument,
  OperationReturn
} from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import type { GraphQLField } from 'graphql';
import { addMatchedGroups } from '../../../utils/add-matched-groups';
import { getTypeId } from '../../../utils/get-type-id';
import { mapGraphQLOperationArgument } from './map-graphql-operation-argument';
import { mapTypeRef } from './map-type-ref';

export function mapGraphQLOperation(
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  op: GraphQLField<any, any, any>,
  opType: 'mutation' | 'query',
  namespace: Namespace,
  schemaTypes: DocType[],
  groups: GroupDefinition[]
): DocOperation {
  logger.debug(`> mapping ${opType} ${op.name}`);

  // determine return type
  const typeRef = mapTypeRef(namespace, op.type, schemaTypes);

  const returnDef: OperationReturn = {
    typeRef,
    status: 'success'
  };

  // determine args
  const fields = op.args;
  const operationArguments: OperationArgument[] = fields.map((field) =>
    mapGraphQLOperationArgument(namespace, field, schemaTypes)
  );
  logger.trace(
    `> mapped args for ${opType} ${op.name}: ${operationArguments.map((a) => a.name).join(', ')}`
  );

  // create operation
  const docOp: DocOperation = {
    id: getTypeId(namespace, op.name),
    namespaceId: namespace.id,
    operationType: opType,
    operationKind: opType === 'mutation' ? 'modify' : 'read',
    name: op.name,
    description: op.description,
    arguments: operationArguments,
    returns: [returnDef],
    deprecationReason: op.deprecationReason,
    groups: [],
    examples: []
  };

  docOp.groups = addMatchedGroups(groups, op.name, `${opType} ${docOp.name}`);

  return docOp;
}
