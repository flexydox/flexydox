import { DocSchema, OperationKind, OperationType } from '@flexydox/doc-schema';

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
  resultType: 'type' | 'operation' | 'argument' | 'customPage' | 'example';
  entityName: string;
  subEntityName?: string;
  operationKind?: OperationKind;
  operationType?: OperationType;
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

export function createSimpleFullTextIndex(schema: DocSchema): SimpleFullText {
  const items: SimpleFullTextItem[] = [];

  for (const type of schema.types) {
    items.push({
      id: `type-${type.id}`,
      entityId: type.id,
      resultType: 'type',
      entityName: type.name,
      content: tokenize(type.name, type.description)
    });
    for (const field of type.fields ?? []) {
      items.push({
        id: `field-${type.id}-${field.name}`,
        entityId: type.id,
        resultType: 'argument',
        entityName: field.name,
        subEntityName: field.name,
        content: tokenize(field.name, field.description)
      });
    }
  }

  for (const operation of schema.operations) {
    items.push({
      id: `operation-${operation.id}`,
      entityId: operation.id,
      resultType: 'operation',
      entityName: operation.name,
      content: tokenize(operation.name, operation.description),
      operationKind: operation.operationKind,
      operationType: operation.operationType
    });
    for (const argument of operation.arguments ?? []) {
      items.push({
        id: `argument-${operation.id}-${argument.name}`,
        entityId: operation.id,
        resultType: 'argument',
        entityName: operation.name,
        subEntityName: argument.name,
        content: tokenize(argument.name, argument.description),
        operationKind: operation.operationKind,
        operationType: operation.operationType
      });
    }
  }

  for (const customPage of schema.customPages ?? []) {
    const entityId = customPage.slug ?? customPage.title;
    items.push({
      id: `customPage-${entityId}`,
      entityId,
      resultType: 'customPage',
      entityName: customPage.title,
      content: tokenize(customPage.title, customPage.content)
    });
  }

  return { items };
}
