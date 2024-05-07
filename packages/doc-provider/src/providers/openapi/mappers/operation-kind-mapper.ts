import { OperationKind } from '@flexydox/doc-schema';

/**
 * Maps a method to an OperationKind
 * @param method The method
 * @returns The OperationKind
 */
export function operationKindMapper(method: string): OperationKind {
  switch (method) {
    case 'get':
      return 'read';
    case 'put':
    case 'post':
    case 'delete':
    case 'patch':
      return 'modify';
    default:
      return 'other';
  }
}
