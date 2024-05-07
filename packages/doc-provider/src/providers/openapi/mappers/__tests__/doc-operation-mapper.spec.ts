import { DocOperation, OperationArgument } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it } from 'vitest';
import chessGameSchema from '../../../../fixtures/openapi-30/chess-game-30.json';
import { createMapperContext } from '../../../../test-utils';
import { setDocType } from '../../fixtures/doc-types.fixture';
import { docOperationMapper } from '../doc-operation-mapper';

describe('openapi/mappers/docOperationMapper', () => {
  describe('Path /players', () => {
    const ctx = createMapperContext();

    setDocType(ctx, 'openapi3.components-schemas-PlayersResponse');
    setDocType(ctx, 'openapi3.components-schemas-Player');
    setDocType(ctx, 'openapi3.components-schemas-ServerError');

    it('should map a GET /players operation', () => {
      const path: OpenAPI.PathItemObject = chessGameSchema.paths[
        '/players'
      ] as OpenAPI.PathItemObject;

      const operation: OpenAPI.OperationObject = path.get!;
      const result = docOperationMapper(ctx, path, '/players', 'get', operation);
      expect(result).toEqual({
        id: 'openapi3.players-get',
        name: '/players',
        namespaceId: ctx.namespace.id,
        operationType: 'get',
        operationKind: 'read',
        description: 'Get all players',
        groups: ['Player', 'Game'],
        examples: [],
        arguments: [],
        returns: [
          {
            status: 'success',
            statusCode: '200',
            typeRef: {
              typeId: 'openapi3.components-schemas-PlayerResponse',
              namespaceId: ctx.namespace.id,
              collectionType: 'none',
              required: false,
              link: {
                title: 'PlayerResponse',
                href: 'openapi3.components-schemas-PlayerResponse',
                description: 'PlayerResponse'
              }
            }
          },
          {
            status: 'error',
            statusCode: '500',
            typeRef: {
              typeId: 'openapi3.components-schemas-ServerError',
              namespaceId: ctx.namespace.id,
              collectionType: 'none',
              required: false,
              link: {
                title: 'ServerError',
                href: 'openapi3.components-schemas-ServerError',
                description: 'Error'
              }
            }
          }
        ]
      } as DocOperation);
    });
  });

  describe('Path /players/{id}', () => {
    const ctx = createMapperContext();

    setDocType(ctx, 'openapi3.components-schemas-PlayersResponse');
    setDocType(ctx, 'openapi3.components-schemas-Player');
    setDocType(ctx, 'openapi3.components-schemas-ServerError');

    it('should map a GET /players/{id} operation', () => {
      const path: OpenAPI.PathItemObject = chessGameSchema.paths[
        '/players/{id}'
      ] as OpenAPI.PathItemObject;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const operation: OpenAPI.OperationObject = path.get!;

      const result = docOperationMapper(ctx, path, '/players/{id}', 'get', operation);
      expect(result.arguments).toEqual([
        {
          name: 'id',
          typeRef: {
            collectionType: 'none',
            typeId: 'openapi3.integer',
            namespaceId: ctx.namespace.id,
            required: false,
            link: {
              title: 'integer',
              href: 'openapi3.integer',
              description: 'integer'
            }
          }
        },
        {
          name: 'name',
          typeRef: {
            collectionType: 'none',
            typeId: 'openapi3.string',
            namespaceId: ctx.namespace.id,
            required: false,
            link: {
              title: 'string',
              href: 'openapi3.string',
              description: 'string'
            }
          }
        }
      ] as OperationArgument[]);
    });
  });
});
