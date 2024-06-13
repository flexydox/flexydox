import { GroupDefinition } from '@flexydox/doc-schema';
import { logger } from '@flexydox/logger';
import { MapperContext } from '../providers/mapper-context';

export function addMatchedGroups(
  ctx: MapperContext,
  testString: string,
  entityName: string
): string[] {
  if (!ctx.namespace.inferGroups) {
    return [];
  }
  const allGroups = [...ctx.groups.values()];

  if (allGroups?.length === 0) {
    return [];
  }
  const matchedGroupIds = allGroups.filter((g) => matchesGroup(g, testString)).map((g) => g.id);
  if (matchedGroupIds.length > 0) {
    logger.debug(`> mapped ${entityName} to groups: ${matchedGroupIds.join(', ')}`);
  }
  return matchedGroupIds;
}

function matchesGroup(group: GroupDefinition, testString: string): boolean {
  if (!group.regex) {
    return false;
  }

  return group.regex.test(testString);
}
