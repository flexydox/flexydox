import { SourceSpec } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import OASNormalize from 'oas-normalize';
import semver from 'semver';

import { loadSchema } from '@graphql-tools/load';

import { UrlLoader } from '@graphql-tools/url-loader';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { JsonFileLoader } from '@graphql-tools/json-file-loader';
import { GraphQLSchema } from 'graphql';

export interface SchemaDefinition {
  type: SourceSpec | null;
  isRecognized: boolean;
  graphQLSchema?: GraphQLSchema | null;
}

async function recognizeOpenAPISchema(url: string): Promise<SchemaDefinition> {
  const oas = new OASNormalize(url, { enablePaths: true });

  try {
    const result = await oas.version();

    const version: string = result.version as string;

    if (semver.satisfies(version, '2.x')) {
      return {
        type: 'openapi2.0',
        isRecognized: true
      };
    }
    if (semver.satisfies(version, '3.0.x')) {
      return {
        type: 'openapi3.0',
        isRecognized: true
      };
    }
    if (semver.satisfies(version, '3.1.x')) {
      return {
        type: 'openapi3.1',
        isRecognized: true
      };
    }
    return {
      type: 'openapi3.0',
      isRecognized: true
    };
  } catch (e) {
    logger.trace(`Error recognizing OpenAPI schema from ${url}`, e);
    return {
      type: null,
      isRecognized: false
    };
  }
}

async function recognizeGraphQLSchema(url: string): Promise<SchemaDefinition> {
  try {
    const schema = await loadSchema(url, {
      loaders: [new UrlLoader(), new JsonFileLoader(), new GraphQLFileLoader()]
    });
    return {
      type: 'graphql',
      isRecognized: true,
      graphQLSchema: schema
    };
  } catch (e) {
    logger.trace(`Error recognizing GraphQL schema from ${url}`, e);
    return {
      type: null,
      isRecognized: false
    };
  }
}

export async function recognizeSchema(url: string): Promise<SchemaDefinition> {
  const openAPIDefinition = await recognizeOpenAPISchema(url);
  if (openAPIDefinition.isRecognized) {
    return openAPIDefinition;
  }
  const graphqlDefinition = await recognizeGraphQLSchema(url);
  return graphqlDefinition;
}
