import {
  DocOperation,
  DocSchema,
  DocType,
  GroupDefinition,
  SourceSpec
} from '@flexydox/doc-schema';
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
      source: name,
      inferGroups: true
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

const getFixtureSchemasDir = (schema: TestSchema) =>
  join(__dirname, `../../../fixtures/${schema}/schemas`);
const getTmpFileName = (name: string) => join(tmpDir, `${name}.json`);

export function getGraphQLSchemaFile(schema: TestSchema): string {
  const schemaFile = fixtureFiles.graphql[schema];
  return join(getFixtureSchemasDir(schema), schemaFile);
}

export function getOpenApiSchemaFile(schema: TestSchema): string {
  const schemaFile = fixtureFiles.openapi[schema];
  return join(getFixtureSchemasDir(schema), schemaFile);
}

export async function writeTestSchema(schema: TestSchema, content: DocSchema) {
  await mkdir(tmpDir, { recursive: true });
  await writeFile(getTmpFileName(schema), JSON.stringify(content, null, '\t'), {
    encoding: 'utf-8'
  });
}

export function getOperation(schema: DocSchema, operationId: string): DocOperation | undefined {
  return schema.operations.find((op) => op.id === operationId);
}
export function getType(schema: DocSchema, typeId: string): DocType | undefined {
  return schema.types.find((op) => op.id === typeId);
}
export function getGroup(schema: DocSchema, groupId: string): GroupDefinition | undefined {
  return schema.groups.find((op) => op.id === groupId);
}
