import { OperationReturn } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { docTypeRefMapper } from './doc-type-ref-mapper';
import { operationReturnStatusMapper } from './operation-return-status-mapper';

/**
 * Maps an OpenAPI.ResponsesObject to multiple OperationReturn
 * @param ctx The MapperContext
 * @param responses The OpenAPI.ResponsesObject
 * @returns The OperationReturn[]
 */
export function operationReturnsMapper(
  ctx: MapperContext,
  responses: OpenAPI.ResponsesObject
): OperationReturn[] {
  const responseStatuses = Object.keys(responses);
  return responseStatuses.flatMap((responseStatus) => {
    const response: OpenAPI.ResponseObject | OpenAPI.ReferenceObject = responses[responseStatus];

    if ('$ref' in response) {
      return {
        status: operationReturnStatusMapper(responseStatus),
        statusCode: responseStatus,
        typeRef: docTypeRefMapper(ctx, response)
      } as OperationReturn;
    } else {
      const responses = [];

      for (const [, mediaResponse] of Object.entries(response.content ?? {})) {
        responses.push({
          status: operationReturnStatusMapper(responseStatus),
          statusCode: responseStatus,
          typeRef: docTypeRefMapper(ctx, mediaResponse.schema)
        } as OperationReturn);
      }
      return responses;
    }
  });
}
