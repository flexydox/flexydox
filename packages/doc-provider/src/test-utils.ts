import { DocSchema, SourceSpec } from '@flexydox/doc-schema';
import { MapperContext } from './providers/mapper-context';

import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises';

export type TestSchema = 'chess' | 'github';

export function createMapperContext(
  name = 'openapi3',
  spec: SourceSpec = 'openapi3.0'
): MapperContext {
  return {
    namespace: {
      id: name,
      name,
      spec,
      source: name
    },
    groups: new Map(),
    types: new Map()
  };
}

const fixtureFiles = {
  graphql: {
    chess: 'chess-game-schema.graphql',
    github: 'github-schema.graphql'
  },
  openapi: {
    chess: 'chess-game-30.json',
    github: 'github.yaml'
  }
};

const tmpDir = join(__dirname, `../../../tmp`);

const getFixtureSchemasDir = () => join(__dirname, `../../../fixtures/chess-game/schemas`);
const getTmpFileName = (name: string) => join(tmpDir, `${name}.json`);

export function getGraphQLSchemaFile(schema: TestSchema): string {
  const schemaFile = fixtureFiles.graphql[schema];
  return join(getFixtureSchemasDir(), schemaFile);
}

export function getOpenApiSchemaFile(schema: TestSchema): string {
  const schemaFile = fixtureFiles.openapi[schema];
  return join(getFixtureSchemasDir(), schemaFile);
}

export async function writeTestSchema(schema: TestSchema, content: DocSchema) {
  await mkdir(tmpDir, { recursive: true });
  await writeFile(getTmpFileName(schema), JSON.stringify(content, null, '\t'), {
    encoding: 'utf-8'
  });
}
