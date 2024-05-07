import { Namespace } from '@flexydox/doc-schema';
import { describe, it } from 'vitest';
import { getOpenApiSchemaFile, writeTestSchema } from '../../../test-utils';
import { SchemaProvider } from '../../schema-provider';
import { OpenApi30SchemaProvider } from '../open-api-30-schema-provider';

describe('Open API 3.0 Provider', () => {
  describe('Chess Game schema', () => {
    const file = getOpenApiSchemaFile('chess');
    const namespace: Namespace = {
      id: 'chess-game-api',
      name: 'Chess Game API',
      spec: 'openapi3.0',
      source: file
    };

    it('should work', async () => {
      const provider: SchemaProvider = new OpenApi30SchemaProvider(namespace, []);

      await provider.getSchema();
    });
  });
});
