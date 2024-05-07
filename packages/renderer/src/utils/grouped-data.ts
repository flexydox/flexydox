import { DocOperation, DocSchema, DocType, OperationKind } from '@flexydox/doc-schema';

function filterEntityByGroup<T = DocOperation | DocType>(entities: T[], groupId: string): T[] {
  return entities.filter((op) => (op as { groups: string[] }).groups.includes(groupId));
}

function filterUnassignedEntity<T = DocOperation | DocType>(entities: T[]): T[] {
  return entities.filter((op) => (op as { groups: string[] }).groups.length === 0);
}

export type GroupedEntities = Record<string, { operations: DocOperation[]; types: DocType[] }>;

function opKindSortKey(kind: OperationKind): string {
  switch (kind) {
    case 'read':
      return '1-read';
    case 'modify':
      return '2-modify';
    case 'subscribe':
      return '3-subscribe';
    default:
      return '4-other';
  }
}

function opNameSortKey(name: string): string {
  return name?.replaceAll('/', '').toLowerCase();
}

export function sortOperations(op1: DocOperation, op2: DocOperation): number {
  const op1Hash = `${opKindSortKey(op1?.operationKind)}-${opNameSortKey(op1?.name)}`;
  const op2Hash = `${opKindSortKey(op2?.operationKind)}-${opNameSortKey(op2?.name)}`;

  return op1Hash.localeCompare(op2Hash);
}

/**
 * Group operations and types by group id
 * @param doc docSchema
 * @returns Record<string, { operations: DocOperation[]; types: DocType[] }>
 */
export function groupEntities(doc: DocSchema): GroupedEntities {
  const groupedEntities: GroupedEntities = {
    unassigned: {
      operations: filterUnassignedEntity(doc.operations).sort(sortOperations),
      types: filterUnassignedEntity(doc.types)
    }
  };

  doc.groups.forEach((group) => {
    groupedEntities[group.id] = {
      operations: filterEntityByGroup(doc.operations, group.id).sort(sortOperations),
      types: filterEntityByGroup(doc.types, group.id)
    };
  });
  return groupedEntities;
}
