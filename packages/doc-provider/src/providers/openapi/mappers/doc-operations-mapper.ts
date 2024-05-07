import { DocOperation } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { docOperationMapper } from './doc-operation-mapper';
import { groupDefinitionsMapper } from './group-definitions-mapper';

export const possibleOperations = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
];

/**
 * Maps an OpenAPI.PathsObject to an array of the DocOperation
 * @param ctx The MapperContext
 * @param paths The OpenAPI.PathsObject
 * @returns The DocOperation[]
 */
export function docOperationsMapper(
  ctx: MapperContext,
  paths: OpenAPI.PathsObject
): DocOperation[] {
  const pathsKeys = Object.keys(paths);

  return pathsKeys.flatMap((pathKey) => {
    logger.debug(`Mapping Path: ${pathKey}`);
    const path: OpenAPI.PathItemObject | undefined = paths[pathKey];
    if (!path) {
      throw new Error(`Failed to map path: ${pathKey}`);
    }

    const operations = docOperationsFromPathMapper(ctx, pathKey, path);
    return operations;
  });
}

/**
 * Maps an OpenAPI.PathItemObject to an array of the DocOperation
 * @param ctx The MapperContext
 * @param pathKey The path key
 * @param path The OpenAPI.PathItemObject
 * @returns The DocOperation[]
 */
export function docOperationsFromPathMapper(
  ctx: MapperContext,
  pathKey: string,
  path: OpenAPI.PathItemObject
): DocOperation[] {
  const operations: DocOperation[] = [];

  for (const operationKey of possibleOperations as OpenAPI.HttpMethods[]) {
    const operation: OpenAPI.OperationObject | undefined = path[operationKey];
    if (operation) {
      groupDefinitionsMapper(ctx.groups, operation.tags);
      operations.push(docOperationMapper(ctx, path, pathKey, operationKey, operation));
    }
  }
  return operations;
}
