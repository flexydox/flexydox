import { DocType, GroupDefinition, Namespace } from '@flexydox/doc-schema';

export interface MapperContext {
  namespace: Namespace;
  types: Map<string, DocType>;
  groups: Map<string, GroupDefinition>;
}
