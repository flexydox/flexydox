import { resolve } from 'path';
import {
  GraphQLSchemaProvider,
  OpenApi30SchemaProvider,
  recognizeSchema
} from '@flexydox/doc-provider';
import { Namespace } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { APIDefinitionConfig, GroupConfig } from '../config/app-config';
import { resolveRelativePathToConfigFile } from './resolve-relative-path';
import { stringToRegex } from './string-to-regex';

export async function parseAPI(api: APIDefinitionConfig, groupConfigs: GroupConfig[]) {
  const apiUrl = resolveRelativePathToConfigFile(api.url);
  const definition = await recognizeSchema(apiUrl);

  if (!definition.isRecognized) {
    throw new Error(`API Url is invalid or has a wrong format: '${apiUrl}'`);
  }

  logger.info(`Parsing '${definition.type}' API ${apiUrl} `);

  const ns: Namespace = {
    id: api.id,
    name: api.name,
    spec: definition.type ?? 'openapi3.0',
    source: apiUrl,
    inferGroups: api.inferGroups ?? true,
    docUrl: api.docUrl
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
    logger.info(`'${definition.type}' API ${apiUrl} parsed successfully`);
    return result;
  }
  if (definition.type === 'openapi3.0') {
    const provider = new OpenApi30SchemaProvider(ns, groups);
    const result = await provider.getSchema();
    logger.info(`'${definition.type}' API ${apiUrl} parsed successfully`);
    return result;
  }
}
