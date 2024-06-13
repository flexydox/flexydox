import { GroupDefinition } from '@flexydox/doc-schema';
import { OpenAPIV3 as OpenAPI } from 'openapi-types';
import { MapperContext } from '../../mapper-context';
import { groupDefinitionMapper } from './group-definition-mapper';

export function groupDefinitionsMapper(
  ctx: MapperContext,
  tags: OpenAPI.TagObject[] | string[] | null | undefined
) {
  const { groups } = ctx;

  if (!tags || !ctx.namespace.inferGroups) {
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
