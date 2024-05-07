import { GroupDefinition } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';

export function groupDefinitionMapper(tag: OpenAPI.TagObject): GroupDefinition {
  return {
    id: tag.name,
    name: tag.description ?? tag.name ?? ''
  };
}
