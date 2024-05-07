import {
  GraphQLSchemaProvider,
  OpenApi30SchemaProvider,
  recognizeSchema
} from '@flexydox/doc-provider';
import { Namespace } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { APIDefinitionConfig, GroupConfig } from '../config/app-config';
import { stringToRegex } from './string-to-regex';

export async function parseAPI(api: APIDefinitionConfig, groupConfigs: GroupConfig[]) {
  const definition = await recognizeSchema(api.url);

  if (!definition.isRecognized) {
    throw new Error(`API Url is invalid or has a wrong format: '${api.url}'`);
  }

  logger.info(`Parsing '${definition.type}' API ${api.url} `);

  const ns: Namespace = {
    id: api.id,
    name: api.name,
    spec: definition.type ?? 'openapi3.0',
    source: api.url
  };
  const groups = (groupConfigs ?? []).map((g) => {
    const regex = stringToRegex(g.regex);
    return { id: g.name, name: g.name, regex: regex };
  });

  if (definition.type === 'graphql') {
    if (!definition.graphQLSchema) {
      throw new Error(`GraphQL schema is not provided for ${api.url}`);
    }

    const provider = new GraphQLSchemaProvider(definition.graphQLSchema, ns, groups);
    const result = await provider.getSchema();
    logger.info(`'${definition.type}' API ${api.url} parsed successfully`);
    return result;
  }
  if (definition.type === 'openapi3.0') {
    const provider = new OpenApi30SchemaProvider(ns, groups);
    const result = await provider.getSchema();
    logger.info(`'${definition.type}' API ${api.url} parsed successfully`);
    return result;
  }
}
