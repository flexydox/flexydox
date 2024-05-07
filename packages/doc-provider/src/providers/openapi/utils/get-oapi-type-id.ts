import { Namespace } from '@flexydox/doc-schema';
import { getTypeId } from '../../../utils/get-type-id';

export function getOAPITypeId(namespace: Namespace, path: string, key: string): string {
  if (!path) {
    return getTypeId(namespace, key);
  }

  return getTypeId(namespace, `${path}-${key}`);
}
