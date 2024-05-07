import { DocSchema, GroupDefinition, Namespace } from '@flexydox/doc-schema';
import { MapperContext } from './mapper-context';

export abstract class SchemaProvider {
  protected _ctx: MapperContext;
  constructor(
    protected readonly namespace: Namespace,
    groups: GroupDefinition[]
  ) {
    this._ctx = {
      namespace: this.namespace,
      types: new Map(),
      groups: new Map((groups ?? []).map((g) => [g.id, g]))
    };
  }
  public abstract getSchema(): Promise<DocSchema>;
}

export abstract class OpenAPISchemaProvider extends SchemaProvider {
  constructor(namespace: Namespace, groups: GroupDefinition[]) {
    super(namespace, groups);
  }
}
