import { GroupDefinition } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { groupDefinitionMapper } from './group-definition-mapper';

export function groupDefinitionsMapper(
  groups: Map<string, GroupDefinition>,
  tags: OpenAPI.TagObject[] | string[] | null | undefined
) {
  if (!tags) {
    return;
  }
  tags.forEach((tag) => {
    const tagName = typeof tag === 'string' ? tag : tag.name;

    if (groups.has(tagName)) {
      return;
    }
    const newTag = typeof tag === 'string' ? { name: tag } : tag;
    groups.set(tagName, groupDefinitionMapper(newTag));
  });
}
