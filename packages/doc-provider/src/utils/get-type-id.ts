import { Namespace } from '@flexydox/doc-schema';

function cleanseId(id: string) {
  return id.replace(/[^\w-]/g, '');
}

export const getTypeId = (namespace: Namespace, id: string) => {
  return `${namespace.id}.${cleanseId(id)}`;
};
export const getTypeUrl = (namespace: Namespace, id: string) => {
  return `/types/${namespace.id}.${cleanseId(id)}`;
};
