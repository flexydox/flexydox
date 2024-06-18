import {
  DocSchema,
  DocTypeKind,
  Namespace,
  OperationKind,
  OperationType
} from '@flexydox/doc-schema';

/**
 * Represents a simple full-text index for the schema.
 */
export interface SimpleFullTextItem {
  /**
   * Unique identifier of the entity.
   */
  id: string;
  /**
   * Entity identifier.
   */
  entityId: string;
  resultType: 'type' | 'operation' | 'op-argument' | 'field';
  entityName: string;
  entityKind?: DocTypeKind;
  subEntityName?: string;
  operationKind?: OperationKind;
  operationType?: OperationType;
  nsName: string;
  nsVersion?: string;
  content: string;
}

const STOP_WORDS = [
  'a',
  'about',
  'above',
  'after',
  'again',
  'against',
  'all',
  'am',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'before',
  'being',
  'below',
  'between',
  'both',
  'but',
  'by',
  'can',
  'did',
  'do',
  'does',
  'doing',
  'don',
  'down',
  'during',
  'each',
  'few',
  'for',
  'from',
  'further',
  'had',
  'has',
  'have',
  'having',
  'he',
  'her',
  'here',
  'hers',
  'herself',
  'him',
  'himself',
  'his',
  'how',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'itself',
  'just',
  'me',
  'more',
  'most',
  'my',
  'myself',
  'no',
  'nor',
  'not',
  'now',
  'of',
  'off',
  'on',
  'once',
  'only',
  'or',
  'other',
  'our',
  'ours',
  'ourselves',
  'out',
  'over',
  'own',
  's',
  'same',
  'she',
  'should',
  'so',
  'some',
  'such',
  't',
  'than',
  'that',
  'the',
  'their',
  'theirs',
  'them',
  'themselves',
  'then',
  'there',
  'these',
  'they',
  'this',
  'those',
  'through',
  'to',
  'too',
  'under',
  'until',
  'up',
  'very',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'you',
  'your',
  'yours',
  'yourself',
  'yourselves'
];

const IGNORED_GRAPHQL_TYPES = ['Query', 'Mutation', 'Subscription'];

export interface SimpleFullText {
  items: SimpleFullTextItem[];
}

function tokenize(...texts: (string | null | undefined)[]): string {
  const cleansedTexts = (texts.filter((t) => t) as string[]).map((t) => t.trim());
  const words = cleansedTexts
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .toLowerCase()
    .split(' ')
    .filter((t) => t)
    .sort();

  return [...new Set(words)].filter((w) => !STOP_WORDS.includes(w)).join('|');
}

function getNamespace(schema: DocSchema, namespaceId: string): Namespace | null {
  return schema.namespaces?.find((ns) => ns.id === namespaceId) ?? null;
}

/**
 * Creates a simple full-text index for the schema.
 * @param schema The schema to index.
 * @returns The full-text index.
 */
export function createSimpleFullTextIndex(schema: DocSchema): SimpleFullText {
  const items: SimpleFullTextItem[] = [];

  for (const type of schema.types) {
    const ns = getNamespace(schema, type.namespaceId);

    // Ignore Query, Mutation, and Subscription types from the index
    if (ns?.spec === 'graphql' && IGNORED_GRAPHQL_TYPES.includes(type.name)) {
      continue;
    }
    items.push({
      id: `type-${type.id}`,
      nsName: ns?.name ?? '',
      nsVersion: ns?.version,
      entityId: type.id,
      entityKind: type.kind,
      resultType: 'type',
      entityName: type.name,
      content: tokenize(type.name, type.description)
    });
    for (const field of type.fields ?? []) {
      items.push({
        id: `field-${type.id}-${field.name}`,
        nsName: ns?.name ?? '',
        nsVersion: ns?.version,
        entityId: type.id,
        entityKind: type.kind,
        resultType: 'field',
        entityName: type.name,
        subEntityName: field.name,
        content: tokenize(type.name, type.kind, type.description, field.name, field.description)
      });
    }
  }

  for (const operation of schema.operations) {
    const ns = getNamespace(schema, operation.namespaceId);
    items.push({
      id: `operation-${operation.id}`,
      nsName: ns?.name ?? '',
      nsVersion: ns?.version,
      entityId: operation.id,
      resultType: 'operation',
      entityName: operation.name,
      content: tokenize(
        operation.name,
        operation.description,
        operation.operationKind,
        operation.operationType
      ),
      operationKind: operation.operationKind,
      operationType: operation.operationType
    });
    for (const argument of operation.arguments ?? []) {
      items.push({
        id: `arg-${operation.id}-${argument.name}`,
        nsName: ns?.name ?? '',
        nsVersion: ns?.version,
        entityId: operation.id,
        resultType: 'op-argument',
        entityName: operation.name,
        subEntityName: argument.name,
        content: tokenize(
          operation.name,
          operation.description,
          operation.operationKind,
          operation.operationType,
          argument.name,
          argument.description
        ),
        operationKind: operation.operationKind,
        operationType: operation.operationType
      });
    }
  }

  return { items };
}
