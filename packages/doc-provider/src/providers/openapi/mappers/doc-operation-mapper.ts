import { DocOperation, OperationType } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { addMatchedGroups } from '../../../utils/add-matched-groups';
import { concatStrings } from '../../../utils/string-utils';
import { MapperContext } from '../../mapper-context';
import { getOAPITypeId } from '../utils/get-oapi-type-id';
import { operationArgumentsMapper } from './operation-arguments-mapper';
import { operationKindMapper } from './operation-kind-mapper';
import { operationReturnsMapper } from './operation-returns-mapper';

/**
 * Maps an OpenAPI.OperationObject to a DocOperation
 * @param ctx The MapperContext
 * @param path The OpenAPI.PathItemObject
 * @param pathKey The path key
 * @param operationKey The operation key
 * @param operation The OpenAPI.OperationObject
 * @returns The DocOperation
 */
export function docOperationMapper(
  ctx: MapperContext,
  path: OpenAPI.PathItemObject,
  pathKey: string,
  operationKey: string,
  operation: OpenAPI.OperationObject
): DocOperation {
  const commonParameters = path.parameters;
  const commonDescription = path.description;
  const commonSummary = path.summary;

  operation.parameters = [...(commonParameters ?? []), ...(operation.parameters ?? [])];
  operation.description = concatStrings('\n', commonDescription, operation.description);

  operation.summary = concatStrings('\n', commonSummary, operation.summary);
  const { namespace } = ctx;

  const pathMatchedGroups = addMatchedGroups(ctx, pathKey, `operation pathKey ${pathKey}`);
  const opMatchedGroups = addMatchedGroups(
    ctx,
    operationKey,
    `operation operationKey ${operationKey} [pathKey: ${pathKey}]`
  );

  const operationTags = ctx.namespace.inferGroups ? operation.tags : [];

  const allGroupIds = [
    ...new Set([...pathMatchedGroups, ...opMatchedGroups, ...(operationTags ?? [])])
  ];

  return {
    groups: allGroupIds,
    id: getOAPITypeId(ctx.namespace, pathKey, operationKey),
    name: pathKey,
    description: concatStrings('\n', operation.description, operation.summary),
    namespaceId: namespace.id,
    operationType: operationKey as OperationType,
    operationKind: operationKindMapper(operationKey),
    arguments: operationArgumentsMapper(ctx, operation.parameters),
    returns: operationReturnsMapper(ctx, operation.responses),
    examples: []
  };
}
