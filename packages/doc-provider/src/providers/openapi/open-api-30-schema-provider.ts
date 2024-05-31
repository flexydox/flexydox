import type { DocOperation, DocSchema, GroupDefinition, Namespace } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import OpenAPIParser from '@readme/openapi-parser';
import type { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { OpenAPISchemaProvider } from '../schema-provider';
import { docOperationsMapper } from './mappers/doc-operations-mapper';
import { docTypeMapper } from './mappers/doc-type-mapper';
import { groupDefinitionsMapper } from './mappers/group-definitions-mapper';
import { getBasicTypes } from './open-api-basic-types';

export type ComponentType = 'schemas' | 'responses' | 'parameters' | 'requestBodies' | 'examples';

export class OpenApi30SchemaProvider extends OpenAPISchemaProvider {
  private readonly parser: OpenAPIParser;
  private _doc: OpenAPI.Document | null = null;

  constructor(namespace: Namespace, groups: GroupDefinition[]) {
    super(namespace, groups);
    this.parser = new OpenAPIParser();
  }

  private async parse(): Promise<void> {
    await this.parser.bundle(this.namespace.source);
    this._doc = this.parser.api as OpenAPI.Document;
  }

  private getGroups(): GroupDefinition[] {
    groupDefinitionsMapper(this._ctx, this.doc.tags);
    return Array.from(this._ctx.groups.values());
  }

  private inferTypes() {
    this.mapBasicTypes();
    this.mapComponentsToTypes('schemas');
    this.mapComponentsToTypes('responses');
    this.mapComponentsToTypes('examples');
    this.mapComponentsToTypes('parameters');
    this.mapComponentsToTypes('requestBodies');
  }

  private mapBasicTypes() {
    const basicTypes = getBasicTypes(this._ctx);
    basicTypes.forEach((type) => {
      this._ctx.types.set(type.id, type);
    });
  }

  private mapComponentsToTypes(componentTypeKey: ComponentType) {
    const components = this.doc.components;

    const componentTypes = components?.[componentTypeKey];
    if (!componentTypes) {
      return;
    }
    const keys = Object.keys(componentTypes);
    keys.forEach((key) => {
      const type = componentTypes[key] as OpenAPI.SchemaObject;
      if (!type) {
        throw new Error(`Failed to map #/components/${componentTypeKey} type: ${key}`);
      }
      const docType = docTypeMapper(this._ctx, `components-${componentTypeKey}`, key, type);
      if (docType) {
        this._ctx.types.set(docType.id, docType);
      } else {
        logger.warn(`Failed to map #/components/${componentTypeKey} to DocType: ${key}`);
      }
    });
  }

  public async getSchema(): Promise<DocSchema> {
    await this.parse();
    // Two times to ensure all types are mapped and referenced
    this.inferTypes();
    this.inferTypes();

    const operations: DocOperation[] = docOperationsMapper(this._ctx, this.paths);

    return {
      namespaces: [this._ctx.namespace],
      operations,
      types: Array.from(this._ctx.types.values()),
      groups: this.getGroups(),
      customPages: []
    };
  }

  private get doc(): OpenAPI.Document {
    if (!this._doc) {
      throw new Error('Failed to parse OpenAPI document');
    }
    return this._doc;
  }

  private get paths(): OpenAPI.PathsObject {
    return this.doc.paths;
  }
}
