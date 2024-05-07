import { type GraphQLSchema, buildSchema } from 'graphql';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { beforeAll, describe, expect, it } from 'vitest';
import { GraphQLSchemaProvider } from '../graphql-schema-provider';

import { readFileSync } from 'node:fs';
import type { DocSchema } from '@flexydox/doc-schema';
import { createMapperContext } from '../../../test-utils';
import { getGraphQLSchemaFile } from '../../../test-utils';

describe('GraphQLSchemaProvider', () => {
  const file = getGraphQLSchemaFile('chess');
  let testGraphQLSchema: GraphQLSchema;
  const ctx = createMapperContext('gql1', 'graphql');

  try {
    const sdlSchema = readFileSync(file, 'utf8');
    testGraphQLSchema = buildSchema(sdlSchema);
  } catch (e) {
    console.error('Error reading test schema', e);
    throw e;
  }

  let output: DocSchema;

  beforeAll(() => {
    const provider = new GraphQLSchemaProvider(testGraphQLSchema, ctx.namespace, [
      { id: 'player', name: 'Player related', regex: /player/i },
      { id: 'game', name: 'Game related', regex: /game/i }
    ]);
    output = provider.mapGraphQLSchema();
  });

  it('output should not be undefined', () => {
    expect(output).not.toBeUndefined();
  });

  it('output should contain type with String scalar definition', () => {
    expect(output.types).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'SCALAR', name: 'String' })])
    );
  });

  it('output should contain list of groups', () => {
    expect(output.groups).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: 'player', name: 'Player related' })])
    );
  });

  it('output should contain type Game type assigned to group "game"', () => {
    const gameType = output.types.find((t) => t.name === 'Game');
    expect(gameType).not.toBeUndefined();

    expect(gameType?.groups).toMatchObject(['game']);
  });
});
