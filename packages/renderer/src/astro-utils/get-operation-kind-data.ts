import { OperationKind } from '@flexydox/doc-schema';
import { Color } from '../types';

export interface OperationKindData {
  color: Color;
}

const opTypeMap: Record<OperationKind, OperationKindData> = {
  read: {
    color: '--c-text-tag-2'
  },
  modify: {
    color: '--c-text-tag-1'
  },
  subscribe: {
    color: '--c-text-tag-3'
  },
  other: {
    color: '--c-text-inactive'
  }
};

export function getOperationKindData(kind: OperationKind): OperationKindData {
  return opTypeMap[kind];
}
