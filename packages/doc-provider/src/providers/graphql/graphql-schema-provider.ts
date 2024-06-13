import { DocOperation, DocSchema, GroupDefinition, Namespace } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLUnionType,
  getNamedType,
  isInputType
} from 'graphql';
import { SchemaProvider } from '../schema-provider';
import { mapGraphQLOperation } from './mappers/map-graphql-operation';
import { mapGraphQLType } from './mappers/map-graphql-type';
import { mapGraphQLTypeField } from './mappers/map-graphql-type-field';
import { isInternalType } from './utils/is-internal-type';

export class GraphQLSchemaProvider extends SchemaProvider {
  private graphQLSchema: GraphQLSchema;
  constructor(graphQLSchema: GraphQLSchema, namespace: Namespace, groups: GroupDefinition[]) {
    super(namespace, groups);
    this.graphQLSchema = graphQLSchema;
  }

  getSchema(): Promise<DocSchema> {
    const docSchema = this.mapGraphQLSchema();
    return Promise.resolve(docSchema);
  }

  mapGraphQLSchema(): DocSchema {
    const graphQLSchema = this.graphQLSchema;
    const mutationType = graphQLSchema.getMutationType();
    const queryType = graphQLSchema.getQueryType();
    const namespace = this.namespace;
    const groups = [...this._ctx.groups.values()];

    const docSchema: DocSchema = {
      namespaces: [namespace],
      operations: [],
      types: [],
      groups: groups,
      customPages: []
    };

    const typeMap = graphQLSchema.getTypeMap();

    // first pass to create all types
    logger.debug(`> mapping ${Object.keys(typeMap).length} types`);
    logger.debug(`> groups: ${groups.map((g) => `${g.name} ${g.regex}`).join(', ')}`);
    for (const typeName in typeMap) {
      const t = typeMap[typeName];

      if (isInternalType(graphQLSchema, t)) {
        continue;
      }
      const dt = mapGraphQLType(this._ctx, t);

      docSchema.types.push(dt);
      docSchema.types.sort((a, b) => a.name.localeCompare(b.name));
    }

    // second pass to resolve type fields
    logger.debug(`> resolving fields for ${Object.keys(typeMap).length} types`);
    for (const typeName in typeMap) {
      const t = typeMap[typeName];
      if (isInternalType(graphQLSchema, t)) {
        continue;
      }

      // resolve type names for unions
      if (t instanceof GraphQLUnionType) {
        const dt = docSchema.types.find((dt) => dt.name === t.name);
        if (!dt) {
          throw new Error(`Type ${t.name} not found in schema during 2nd pass`);
        }
        dt.unionTypes = t.getTypes().map((i) => {
          const underlyingType = getNamedType(i);
          const schemaType = docSchema.types.find((t) => t.name === underlyingType.name);
          if (!schemaType) {
            throw new Error(`Type ${i.name} not found in schema during type.interface mapping`);
          }
          return schemaType.id;
        });
      }

      // resolve interface names for object and interface types
      if (t instanceof GraphQLObjectType || t instanceof GraphQLInterfaceType) {
        const dt = docSchema.types.find((dt) => dt.name === t.name);
        if (!dt) {
          throw new Error(`Type ${t.name} not found in schema during 2nd pass`);
        }
        const interfaces = t.getInterfaces();
        if (interfaces.length > 0) {
          dt.interfaces = interfaces.map((i) => {
            const underlyingType = getNamedType(i);
            const schemaType = docSchema.types.find((t) => t.name === underlyingType.name);
            if (!schemaType) {
              throw new Error(`Type ${i.name} not found in schema during type.interface mapping`);
            }
            return schemaType.id;
          });
        }
      }

      if (
        !(
          t instanceof GraphQLScalarType ||
          t instanceof GraphQLEnumType ||
          t instanceof GraphQLUnionType
        )
      ) {
        logger.trace(`> resolving fields for ${t.name}`);
        const dt = docSchema.types.find((dt) => dt.name === t.name);
        if (!dt) {
          throw new Error(`Type ${t.name} not found in schema during 2nd pass`);
        }

        const fields = t.getFields();
        const isInput = isInputType(t);
        dt.fields = Object.keys(fields).map((fieldName) =>
          mapGraphQLTypeField(namespace, fields[fieldName], docSchema.types, isInput)
        );
        logger.trace(
          `> resolved fields for ${dt.name}: ${dt.fields.map((f) => f.name).join(', ')}`
        );
      }
    }

    // if mutationType defined, then add mutations to operations
    if (mutationType) {
      const fields = mutationType.getFields();
      logger.debug(`> mapping ${Object.keys(fields).length} mutations`);
      const mutations: DocOperation[] = [];
      for (const fieldName in fields) {
        const docOp = mapGraphQLOperation(
          this._ctx,
          fields[fieldName],
          'mutation',
          docSchema.types
        );
        mutations.push(docOp);
      }
      mutations.sort((a, b) => a.name.localeCompare(b.name));
      docSchema.operations.push(...mutations);
    }

    // if queryType defined, then add queries to operations
    if (queryType) {
      const fields = queryType.getFields();
      logger.debug(`> mapping ${Object.keys(fields).length} queries`);
      const queries: DocOperation[] = [];
      for (const fieldName in fields) {
        const docOp = mapGraphQLOperation(this._ctx, fields[fieldName], 'query', docSchema.types);
        queries.push(docOp);
      }
      queries.sort((a, b) => a.name.localeCompare(b.name));
      docSchema.operations.push(...queries);
    }

    return docSchema;
  }
}
