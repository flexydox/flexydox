import { DocSchema, Namespace } from '@flexydox/doc-schema';
import { beforeEach, describe, expect, it } from 'vitest';
import { getGroup, getOpenApiSchemaFile, getOperation, writeTestSchema } from '../../../test-utils';
import { SchemaProvider } from '../../schema-provider';
import { OpenApi30SchemaProvider } from '../open-api-30-schema-provider';

const ns: Namespace = {
  id: 'chess-game-api',
  name: 'Chess Game API',
  spec: 'openapi3.0',
  source: 'to-be-replaced',
  inferGroups: true
};

describe('Open API 3.0 Provider', () => {
  describe('Chess Game schema - infer groups', () => {
    let schema: DocSchema;
    beforeEach(async () => {
      const file = getOpenApiSchemaFile('chess');
      const namespace: Namespace = { ...ns, source: file };
      const provider: SchemaProvider = new OpenApi30SchemaProvider(namespace, []);
      schema = await provider.getSchema();
    });

    it('should infer Game group from OpenAPI tags', () => {
      const group = getGroup(schema, 'Game');
      expect(group).toBeDefined();
    });

    it('should infer Player group from OpenAPI tags', () => {
      const group = getGroup(schema, 'Player');
      expect(group).toBeDefined();
    });
  });
  describe('Chess Game schema - do not infer groups', () => {
    let schema: DocSchema;
    beforeEach(async () => {
      const file = getOpenApiSchemaFile('chess');
      const namespace: Namespace = { ...ns, source: file, inferGroups: false };
      const provider: SchemaProvider = new OpenApi30SchemaProvider(namespace, []);
      schema = await provider.getSchema();
    });

    it('should not infer any groups from OpenAPI tags', () => {
      expect(schema.groups).toEqual([]);
    });
    it('should not assign groups from OpenAPI tags to operations', () => {
      const op = getOperation(schema, 'chess-game-api.players-get');
      const playersGroups = op?.groups || [];
      expect(playersGroups).toEqual([]);
    });
  });
});
