import { OperationArgument } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { docTypeRefMapper } from './doc-type-ref-mapper';

/**
 * Maps an OpenAPI.ParameterObject[] to OperationArgument[]
 * @param ctx The MapperContext
 * @param parameters The OpenAPI.ParameterObject[]
 * @returns The OperationArgument[]
 */
export function operationArgumentsMapper(
  ctx: MapperContext,
  parameters: (OpenAPI.ReferenceObject | OpenAPI.ParameterObject)[]
): OperationArgument[] {
  return parameters.map((parameter) => {
    if ('$ref' in parameter) {
      return {
        name: 'key',
        typeRef: docTypeRefMapper(ctx, parameter)
      };
    }
    return {
      name: parameter.name,
      typeRef: docTypeRefMapper(ctx, parameter.schema)
    };
  });
}
